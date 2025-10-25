const fs = require('fs');
const path = require('path');
console.log('Reviewer agent stub - would validate using review-checklist');

// Example: after writing a review artifact, index it
const exampleReview = path.resolve(process.cwd(), 'artifacts/queue/reviewer-example.json');
if (fs.existsSync(exampleReview)) {
    try { const { indexArtifact } = require('../../shared/artifact-utils'); indexArtifact(exampleReview); console.log('Indexed example review'); } catch(e) { console.warn('Could not index review:', e.message); }
}
