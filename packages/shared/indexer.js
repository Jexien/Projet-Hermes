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
  console.log('Indexed', filePath, '->', indexPath);
}

module.exports = { sha256File, indexArtifact };

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node indexer.js <file1> [file2] ...');
    process.exit(0);
  }
  args.forEach(f => {
    const p = path.resolve(process.cwd(), f);
    if (!fs.existsSync(p)) {
      console.error('File not found', p);
      return;
    }
    indexArtifact(p);
  });
}
