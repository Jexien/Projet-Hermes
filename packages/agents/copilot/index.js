const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const queueDir = path.join(root, 'artifacts/queue');
const mergedDir = path.join(root, 'artifacts/merged');
const failedDir = path.join(root, 'artifacts/failed');
const policies = JSON.parse(fs.readFileSync(path.join(__dirname, 'policies.json'), 'utf8'));

function readJson(f) {
  try { return JSON.parse(fs.readFileSync(f,'utf8')); } catch(e) { return null; }
}

function findPRs() {
  return fs.readdirSync(queueDir).filter(f => f.startsWith('pr-') || f.endsWith('pr-test.json'));
}

function findReviewsForPR(prId) {
  return fs.readdirSync(queueDir)
    .filter(f => f.startsWith('review-') && f.includes(prId))
    .map(f => readJson(path.join(queueDir,f)))
    .filter(Boolean);
}

function decidePR(prFile) {
  const pr = readJson(path.join(queueDir, prFile));
  if (!pr) return;
  const prId = pr.id || prFile.replace(/\.json$/,'');
  const reviews = findReviewsForPR(prId);
  console.log('Found reviews for', prId, reviews.map(r => r && r.score));
  const threshold = policies.quorum.threshold || 0.8;
  const required = policies.quorum.reviewerCount || 2;
  const passing = reviews.filter(r => r.score >= threshold);
  if (passing.length >= required) {
    // merge
    const mergedPath = path.join(mergedDir, prFile);
    fs.copyFileSync(path.join(queueDir, prFile), mergedPath);
    fs.writeFileSync(path.join(mergedDir, `merge-log-${prId}.json`), JSON.stringify({ prId, mergedBy: 'copilot', timestamp: new Date().toISOString(), reviewCount: passing.length }, null, 2));
    console.log('Merged PR', prId);
  } else {
    console.log('PR', prId, 'did not meet quorum:', passing.length, '/', required);
  }
}

function main() {
  if (!fs.existsSync(queueDir)) {
    console.error('Queue dir not found', queueDir);
    process.exit(1);
  }
  if (!fs.existsSync(mergedDir)) fs.mkdirSync(mergedDir, { recursive: true });
  if (!fs.existsSync(failedDir)) fs.mkdirSync(failedDir, { recursive: true });

  const prs = findPRs();
  prs.forEach(p => decidePR(p));
}

main();
