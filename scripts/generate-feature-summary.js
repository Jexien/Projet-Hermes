const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const checkMode = args.includes('--check')
const writeMode = args.includes('--write') || (!checkMode && !args.includes('--check'))

const detailedPath = path.join(__dirname, '..', 'docs', 'canva_adobe_express_feature_audit_detailed.json')
const summaryPath = path.join(__dirname, '..', 'docs', 'canva_adobe_express_feature_audit.json')

function shortDesc(desc){
  if (!desc) return ''
  return desc.split('\n')[0].slice(0, 200)
}

function generate(d){
  const out = {
    generated_at: new Date().toISOString(),
    features: []
  }
  if (!Array.isArray(d.features)) return out
  for(const f of d.features){
    out.features.push({
      id: f.id || null,
      name: f.name || null,
      priority: f.priority || null,
      short_description: shortDesc(f.description || f.short_desc || ''),
      estimate_days: (f.estimate_days || (f.estimate_days===0?0:null) ) || (f.integration_contract && f.integration_contract.estimate_days) || null,
      deps: f.deps || f.dependencies || (f.integration_contract && f.integration_contract.deps) || [],
      missing: !!f.missing,
      tags: f.tags || []
    })
  }
  return out
}

try{
  const raw = fs.readFileSync(detailedPath, 'utf8')
  const detailed = JSON.parse(raw.replace(/^\uFEFF/, ''))
  const summary = generate(detailed)
  const summaryStr = JSON.stringify(summary, null, 2) + '\n'

  if (checkMode){
    if (!fs.existsSync(summaryPath)){
      console.error('Summary file does not exist:', summaryPath)
      process.exit(2)
    }
    const existing = fs.readFileSync(summaryPath, 'utf8')
    if (existing !== summaryStr){
      console.error('Feature summary out-of-sync. Run: node scripts/generate-feature-summary.js --write')
      const a = existing.split('\n')
      const b = summaryStr.split('\n')
      for(let i=0;i<Math.max(a.length,b.length);i++){
        if (a[i] !== b[i]){
          console.error('First diff at line', i+1)
          break
        }
      }
      process.exit(3)
    }
    console.log('Feature summary is up-to-date')
    process.exit(0)
  }

  if (writeMode){
    fs.writeFileSync(summaryPath, summaryStr, 'utf8')
    console.log('Wrote summary to', summaryPath)
  }
}catch(err){
  console.error('Error generating feature summary:', err && err.message)
  process.exit(1)
}
