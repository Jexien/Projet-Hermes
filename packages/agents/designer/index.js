#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const AGENT_ID = 'designer';
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

function scaffold(){
	// produce a fake asset metadata artifact (no external network)
	const asset = {
		id: `asset-${uuid()}`,
		agentId: AGENT_ID,
		type: 'asset',
		title: 'example-asset',
		metadata: { format: 'png', size: 1024 },
		timestamp: new Date().toISOString()
	};
	return writeArtifact(asset, 'queue');
}

function usage(){
	console.log(`${AGENT_ID} runner`);
	console.log('Commands:');
	console.log('  scaffold --root <repoRoot>    create a sample asset artifact');
}

const cmd = args[0] || '';
if(cmd === 'scaffold') scaffold();
else usage();
