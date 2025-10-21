const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sha256File(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

function indexArtifact(filePath) {
  const indexPath = path.resolve(__dirname, '../../artifacts/index.jsonl');
  const rel = path.relative(path.resolve(__dirname, '../..'), filePath);
  const hash = sha256File(filePath);
  const stat = fs.statSync(filePath);
  const entry = {
    id: path.basename(filePath),
    path: rel.replace(/\\/g,'/'),
    hash,
    size: stat.size,
    timestamp: new Date().toISOString()
  };
  fs.appendFileSync(indexPath, JSON.stringify(entry) + '\n');
  return entry;
}

module.exports = { sha256File, indexArtifact };
