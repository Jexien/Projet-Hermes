#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const rootArgIndex = args.indexOf('--root');
const ROOT = rootArgIndex !== -1 ? path.resolve(args[rootArgIndex+1]) : path.resolve(__dirname, '../../..');

function loadCatalog(){
  const p = path.join(ROOT, 'packages', 'agents', 'catalog.json');
  if(!fs.existsSync(p)) throw new Error('catalog.json not found');
  return JSON.parse(fs.readFileSync(p,'utf8'));
}

function runAgent(agentId, commandParts){
  const catalog = loadCatalog();
  const entry = catalog.agents && catalog.agents[agentId];
  if(!entry) throw new Error(`agent ${agentId} not found in catalog`);
  const agentPath = path.join(ROOT, entry.path);
  if(!fs.existsSync(agentPath)) throw new Error(`agent script missing: ${agentPath}`);
  const spawnArgs = [agentPath].concat(commandParts).concat(['--root', ROOT]);
  console.log('orchestrator: running', 'node', spawnArgs.join(' '));
  const r = spawnSync('node', spawnArgs, { stdio: 'inherit' });
  if(r.error) throw r.error;
  return r.status;
}

function usage(){
  console.log('orchestrator usage:');
  console.log('  run <agentId> <command> [--root <repoRoot>]');
  console.log('  run-sequence --sequence "agent:command,agent:command" [--root <repoRoot>]');
}

const cmd = args[0];
if(!cmd){ usage(); process.exit(0); }

try{
  if(cmd === 'run'){
    const agentId = args[1];
    const command = args[2];
    if(!agentId || !command) { usage(); process.exit(2); }
    const status = runAgent(agentId, [command]);
    process.exit(status);
  } else if(cmd === 'run-sequence'){
    const seqIndex = args.indexOf('--sequence');
    if(seqIndex === -1){ usage(); process.exit(2); }
    const seq = args[seqIndex+1] || '';
    const parts = seq.split(',').map(s => s.trim()).filter(Boolean);
    for(const p of parts){
      const [agentId, command] = p.split(':');
      if(!agentId || !command) throw new Error('invalid sequence element: '+p);
      const status = runAgent(agentId, [command]);
      if(status !== 0){ console.error('orchestrator: step failed', p); process.exit(status); }
    }
    process.exit(0);
  } else {
    usage();
  }
}catch(e){ console.error('orchestrator error:', e.message); process.exit(3); }
