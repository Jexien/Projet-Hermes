#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const AGENT_ID = 'planner';
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

function planFromRepo(){
	const pkgsDir = path.join(ROOT, 'packages');
	const items = [];
	try{
		const names = fs.existsSync(pkgsDir) ? fs.readdirSync(pkgsDir) : [];
		names.forEach(n => {
			const p = path.join(pkgsDir, n);
			if(fs.existsSync(path.join(p, 'package.json'))){
				items.push({ package: n, task: 'review-package', priority: 'P1' });
			}
		});
	}catch(e){ console.warn('planner: scan error', e.message); }

	const artifact = { id: `plan-${uuid()}`, agentId: AGENT_ID, type: 'plan', tasks: items, timestamp: new Date().toISOString() };
	return writeArtifact(artifact, 'queue');
}

function usage(){
	console.log('planner runner');
	console.log('Commands: scaffold | plan');
}

const cmd = args[0] || '';
if(cmd === 'plan') planFromRepo();
else if(cmd === 'scaffold') writeArtifact({ id: `note-${uuid()}`, agentId: AGENT_ID, type: 'note', title: 'planner-scaffold', timestamp: new Date().toISOString() });
else usage();
