#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const AGENT_ID = 'dev-backend';
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

function smokeBackend(){
	// check for apps/api or packages indicating backend
	const api = path.join(ROOT, 'apps', 'api');
	const ok = fs.existsSync(api);
	const artifact = { id: `ci-${uuid()}`, agentId: AGENT_ID, type: 'ci-report', name: 'backend-smoke', success: ok, timestamp: new Date().toISOString() };
	return writeArtifact(artifact, 'queue');
}

const cmd = args[0] || '';
if(cmd === 'ci') smokeBackend(); else console.log('dev-backend: usage: ci --root <repoRoot>');
