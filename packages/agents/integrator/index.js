#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const AGENT_ID = 'integrator';
const args = process.argv.slice(2);
const rootArgIndex = args.indexOf('--root');
const ROOT = rootArgIndex !== -1 ? path.resolve(args[rootArgIndex+1]) : path.resolve(__dirname, '../../..');

function readJson(p){ try{ return JSON.parse(fs.readFileSync(p,'utf8')); }catch(e){return null} }
function uuid(){ try{ return require('crypto').randomUUID(); }catch(e){ return 'id-'+Date.now(); } }

function loadPolicies(){
	const shared = path.join(ROOT, 'packages', 'agents', 'policies.json');
	try{ if(fs.existsSync(shared)) return JSON.parse(fs.readFileSync(shared,'utf8')); }catch(e){}
	return { quorum: { threshold: 0.8, reviewerCount: 1 } };
}

function processQueue(){
	const policies = loadPolicies();
	const threshold = (policies && policies.quorum && typeof policies.quorum.threshold === 'number') ? policies.quorum.threshold : 0.8;
	const required = (policies && policies.quorum && typeof policies.quorum.reviewerCount === 'number') ? policies.quorum.reviewerCount : 1;

	const queue = path.join(ROOT, 'artifacts', 'queue');
	const merged = path.join(ROOT, 'artifacts', 'merged');
	if(!fs.existsSync(queue)) return console.log('no queue');
	fs.mkdirSync(merged, { recursive: true });
	const files = fs.readdirSync(queue).filter(f => f.endsWith('.json'));
	files.forEach(f => {
		const p = path.join(queue,f);
		const a = readJson(p);
		if(!a) return;
		if(a.type === 'pr'){
			const reviews = fs.readdirSync(queue).filter(x => x.endsWith('.json')).map(x => readJson(path.join(queue,x))).filter(Boolean).filter(r => r.type === 'review' && (r.prId === a.id || r.prId === a.prId));
			const passing = reviews.filter(r => (r.score||0) >= threshold);
			if(passing.length >= required){
				fs.copyFileSync(p, path.join(merged,f));
				const log = { prId: a.id, mergedBy: AGENT_ID, timestamp: new Date().toISOString(), reviews: passing.length };
				fs.writeFileSync(path.join(merged, `merge-log-${a.id}.json`), JSON.stringify(log,null,2));
				console.log('integrator: merged', a.id);
			}
		}
	});
}

const cmd = args[0] || '';
if(cmd === 'process') processQueue(); else console.log('integrator usage: process --root <repoRoot>');
