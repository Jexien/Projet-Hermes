const fs = require('fs');
const path = require('path');
let uuidv4;
try { uuidv4 = require('uuid').v4; } catch (e) {
  // fallback simple uuidv4 generator (not cryptographically strong)
  uuidv4 = () => 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8); return v.toString(16);
  });
}

const queueDir = path.resolve(__dirname, '../../artifacts/queue');
const mergedDir = path.resolve(__dirname, '../../artifacts/merged');
const failedDir = path.resolve(__dirname, '../../artifacts/failed');

function ensure(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensure(queueDir);
ensure(mergedDir);
ensure(failedDir);

function now() { return new Date().toISOString(); }

// 1. Developer proposes a PR
const prId = uuidv4();
const pr = {
  id: prId,
  authorAgent: 'dev-frontend',
  baseBranch: 'dev',
  targetBranch: 'main',
  title: 'PoC change from dev-frontend',
  description: 'Auto-generated PR by agent-poc',
  filesChanged: ['apps/web/pages/index.tsx'],
  testsRun: [],
  testReportHash: null,
  metrics: {},
  justification: 'refactor and add landing example',
  timestamp: now(),
  metadata: { priority: 'normal' }
};
const prPath = path.join(queueDir, `pr-${prId}.json`);
fs.writeFileSync(prPath, JSON.stringify(pr, null, 2));
console.log('Developer: wrote PR artifact ->', prPath);

// 2. Tester runs tests (simulate)
const testReport = {
  id: `test-${prId}`,
  prId,
  passed: true,
  summary: 'All unit tests passed (simulated)',
  details: [],
  timestamp: now()
};
const testPath = path.join(queueDir, `test-${prId}.json`);
fs.writeFileSync(testPath, JSON.stringify(testReport, null, 2));
console.log('Tester: wrote test report ->', testPath);
// index artifact
try { const { indexArtifact } = require('../shared/artifact-utils'); indexArtifact(testPath); } catch(e) { console.warn('Indexing failed (artifact-utils missing?)', e.message); }

// 3. Reviewer evaluates
const reviewerScore = testReport.passed ? 0.92 : 0.35;
const review = {
  id: `review-${prId}`,
  prId,
  reviewerAgent: 'reviewer',
  score: reviewerScore,
  justification: testReport.passed ? 'Tests OK; lint OK (simulated)' : 'Tests failed',
  timestamp: now()
};
const reviewPath = path.join(queueDir, `review-${prId}.json`);
fs.writeFileSync(reviewPath, JSON.stringify(review, null, 2));
console.log('Reviewer: wrote review ->', reviewPath);
try { const { indexArtifact } = require('../shared/artifact-utils'); indexArtifact(reviewPath); } catch(e) { console.warn('Indexing failed (artifact-utils missing?)', e.message); }

// 4. Integrator decides
const threshold = 0.8;
if (review.score >= threshold) {
  // merge: move PR artifact to merged
  const mergedPath = path.join(mergedDir, `pr-${prId}.json`);
  fs.copyFileSync(prPath, mergedPath);
  // write merge log
  const mergeLog = {
    prId,
    mergedBy: 'integrator',
    timestamp: now(),
    reviewScore: review.score
  };
  fs.writeFileSync(path.join(mergedDir, `merge-log-${prId}.json`), JSON.stringify(mergeLog, null, 2));
  console.log('Integrator: merged PR ->', mergedPath);
} else {
  const failPath = path.join(failedDir, `pr-${prId}.json`);
  fs.copyFileSync(prPath, failPath);
  fs.writeFileSync(path.join(failedDir, `fail-log-${prId}.json`), JSON.stringify({ prId, reviewScore: review.score, timestamp: now() }, null, 2));
  console.log('Integrator: PR failed quality gates ->', failPath);
}

console.log('PoC completed. Inspect artifacts in artifacts/');
