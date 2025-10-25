#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const AGENT_ID = 'reviewer';
const args = process.argv.slice(2);
const rootArgIndex = args.indexOf('--root');
const ROOT = rootArgIndex !== -1 ? path.resolve(args[rootArgIndex+1]) : path.resolve(__dirname, '../../..');

function uuid(){ try{ return require('crypto').randomUUID(); }catch(e){ return 'id-'+Date.now(); } }
function writeArtifact(obj, subdir='queue'){
	const dir = path.join(ROOT, 'artifacts', subdir);
	fs.mkdirSync(dir, { recursive: true });
	const filename = `${obj.id || uuid()}.json`;
	const full = path.join(dir, filename);
	fs.writeFileSync(full, JSON.stringify(obj, null, 2), 'utf8');
	console.log(`${AGENT_ID}: wrote artifact`, full);
	return full;
}

function reviewPR(pr){
	const score = Math.random() < 0.9 ? 0.95 : 0.5;
	const rev = { id: `review-${uuid()}`, agentId: AGENT_ID, type: 'review', prId: pr.id || pr.prId || null, score, timestamp: new Date().toISOString() };
	return writeArtifact(rev, 'queue');
}

function findPRs(){
	const q = path.join(ROOT, 'artifacts', 'queue');
	if(!fs.existsSync(q)) return [];
	return fs.readdirSync(q).filter(f => f.endsWith('.json')).map(f => {
		try{ return JSON.parse(fs.readFileSync(path.join(q,f),'utf8')); }catch(e){return null}
	}).filter(Boolean).filter(a => a.type === 'pr');
}

const cmd = args[0] || '';
if(cmd === 'run'){
	const prs = findPRs();
	prs.forEach(pr => reviewPR(pr));
	console.log('reviewer: processed', prs.length, 'PRs');
} else console.log('reviewer usage: run --root <repoRoot>');
