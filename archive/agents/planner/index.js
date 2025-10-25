const fs = require('fs');
const path = require('path');
const queueDir = path.resolve(__dirname, '../../../artifacts/queue');

console.log('Planner agent starting - stub runner');

if (!fs.existsSync(queueDir)) {
  console.log('Queue dir does not exist:', queueDir);
  process.exit(0);
}

// Simple listing loop (stub)
fs.readdir(queueDir, (err, files) => {
  if (err) return console.error('read queue err', err);
  files.forEach(f => {
    const p = path.join(queueDir, f);
    console.log('Found queue item:', p);
  });
});
