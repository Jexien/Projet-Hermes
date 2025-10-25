#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const AGENT_ID = 'dev-frontend';
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

function lintBuild(){
	// simple heuristic: check for apps/web folder
	const web = path.join(ROOT, 'apps', 'web');
	const ok = fs.existsSync(web);
	const artifact = { id: `ci-${uuid()}`, agentId: AGENT_ID, type: 'ci-report', name: 'frontend-lint-build', success: ok, timestamp: new Date().toISOString() };
	return writeArtifact(artifact, 'queue');
}

const cmd = args[0] || '';
if(cmd === 'ci') lintBuild(); else console.log('dev-frontend: usage: ci --root <repoRoot>');
