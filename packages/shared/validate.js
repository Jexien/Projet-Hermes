// Lightweight artifact validator: no external deps, simple checks.
const fs = require('fs');

function validateArtifact(obj){
  const res = { valid: true, errors: [] };
  if(!obj || typeof obj !== 'object'){
    res.valid = false; res.errors.push('artifact must be an object'); return res;
  }
  if(!obj.id) res.errors.push('missing id');
  if(!obj.agentId) res.errors.push('missing agentId');
  if(!obj.type) res.errors.push('missing type');
  if(!obj.timestamp) res.errors.push('missing timestamp');
  if('score' in obj){ const s = obj.score; if(typeof s !== 'number' || s < 0 || s > 1) res.errors.push('score must be number between 0 and 1'); }
  res.valid = res.errors.length === 0;
  return res;
}

module.exports = { validateArtifact };
