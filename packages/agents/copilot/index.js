#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function uuidv4() {
  try { return require('crypto').randomUUID(); } catch(e) { return 'xxxxxx-'+Date.now(); }
}

const args = process.argv.slice(2);
const rootArgIndex = args.indexOf('--root');
const ROOT = rootArgIndex !== -1 ? path.resolve(args[rootArgIndex+1]) : path.resolve(__dirname, '../../..');

function writeArtifact(obj, subdir='queue'){
  const dir = path.join(ROOT, 'artifacts', subdir);
  fs.mkdirSync(dir, { recursive: true });
  const filename = `${obj.id || uuidv4()}.json`;
  const full = path.join(dir, filename);
  fs.writeFileSync(full, JSON.stringify(obj, null, 2), 'utf8');
  console.log('Wrote artifact', full);
  return full;
}

function tryIndex(filePath){
  const indexerModule = path.join(ROOT, 'packages', 'shared', 'indexer.js');
  if(fs.existsSync(indexerModule)){
    try{
      const mod = require(indexerModule);
      if(typeof mod === 'function') return mod(filePath);
      // else try as CLI
      spawnSync('node', [indexerModule, filePath], { stdio: 'inherit' });
    }catch(e){ console.warn('Indexing failed', e.message); }
  }
}

function readJson(file){ try{ return JSON.parse(fs.readFileSync(file,'utf8')); }catch(e){return null;} }

function scaffoldExamplePR(){
  const id = `pr-${uuidv4()}`;
  const pr = {
    id,
    agentId: 'copilot-agent',
    type: 'pr',
    title: 'PoC: agent proposed change',
    description: 'Squelette de PR proposé par Copilot agent',
    files: [ { path: 'README.md', change: 'append', content: 'Agent PoC' } ],
    timestamp: new Date().toISOString()
  };
  const p = writeArtifact(pr, 'queue');
  tryIndex(p);
  console.log('PR artifact created:', p);
}

function loadPolicies(){
  const p = path.join(__dirname, 'policies.json');
  if(fs.existsSync(p)) return JSON.parse(fs.readFileSync(p,'utf8'));
  return { quorum: { threshold: 0.8, reviewerCount: 2 } };
}

function findPRFiles(queueDir){
  if(!fs.existsSync(queueDir)) return [];
  return fs.readdirSync(queueDir).filter(f => f.endsWith('.json'));
}

function findReviewsForPR(queueDir, prId){
  return findPRFiles(queueDir)
    .filter(f => f.startsWith('review-') && f.includes(prId))
    .map(f => readJson(path.join(queueDir,f))).filter(Boolean);
}

function processQueue(){
  const policies = loadPolicies();
  const queueDir = path.join(ROOT, 'artifacts', 'queue');
  const mergedDir = path.join(ROOT, 'artifacts', 'merged');
  if (!fs.existsSync(queueDir)) { console.log('No queue dir, nothing to process'); return; }
  fs.mkdirSync(mergedDir, { recursive: true });

  const files = findPRFiles(queueDir);
  files.forEach(f => {
    const pr = readJson(path.join(queueDir,f));
    if(!pr || pr.type !== 'pr') return;
    const prId = pr.id;
    const reviews = findReviewsForPR(queueDir, prId);
    console.log('Found reviews for', prId, reviews.map(r => r && r.score));
    const threshold = policies.quorum.threshold || 0.8;
    const required = policies.quorum.reviewerCount || 2;
    const passing = reviews.filter(r => (r.score||0) >= threshold);
    if(passing.length >= required){
      const src = path.join(queueDir,f);
      const dest = path.join(mergedDir,f);
      fs.copyFileSync(src,dest);
      const log = { prId, mergedBy: 'copilot', timestamp: new Date().toISOString(), reviewCount: passing.length };
      fs.writeFileSync(path.join(mergedDir, `merge-log-${prId}.json`), JSON.stringify(log, null, 2));
      console.log('Merged PR', prId);
    } else {
      console.log('PR', prId, 'did not meet quorum:', passing.length, '/', required);
    }
  });
}

function usage(){
  console.log('copilot agent runner\n');
  console.log('Commands:');
  console.log('  scaffold:example-pr --root <repoRoot>   create example PR artifact');
  console.log('  process:queue --root <repoRoot>         process queue and attempt merges');
}

const cmd = args[0] || '';
if(cmd.startsWith('scaffold')) scaffoldExamplePR();
else if(cmd.startsWith('process')) processQueue();
else usage();

