// Validator that prefers AJV + JSON Schemas when available, otherwise falls back to a lightweight check.
const fs = require('fs');
const path = require('path');

function loadAjvAndSchemas(ROOT){
  try{
    const Ajv = require('ajv');
    const ajv = new Ajv({ allErrors: true, strict: false });
    const schemasDir = path.join(ROOT, 'packages', 'shared', 'schemas');
    if(fs.existsSync(schemasDir)){
      const files = fs.readdirSync(schemasDir).filter(f => f.endsWith('.json'));
      files.forEach(f => {
        try{
          const s = JSON.parse(fs.readFileSync(path.join(schemasDir,f),'utf8'));
          if(s && s.title){ ajv.addSchema(s, f); }
        }catch(e){}
      });
    }
    return ajv;
  }catch(e){ return null; }
}

function lightweightValidate(obj){
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

function validateArtifact(obj, ROOT){
  // try AJV first
  const ajv = loadAjvAndSchemas(ROOT || path.resolve(__dirname, '../..'));
  if(ajv){
    try{
      const ref = obj.type ? `${obj.type}.schema.json` : null;
      if(ref && ajv.getSchema(ref)){
        const valid = ajv.validate(ref, obj);
        return { valid: !!valid, errors: ajv.errors ? ajv.errors.map(e => `${e.instancePath} ${e.message}`) : [] };
      }
    }catch(e){ /* fall through to lightweight */ }
  }
  return lightweightValidate(obj);
}

module.exports = { validateArtifact };
