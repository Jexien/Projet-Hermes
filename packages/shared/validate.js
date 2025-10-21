const fs = require('fs');
const path = require('path');

// Lightweight validator wrapper: uses AJV if available, else prints helpful message.
(async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node validate.js <schema-file> <json-file>');
    process.exit(0);
  }
  const [schemaFile, jsonFile] = args;
  if (!fs.existsSync(schemaFile)) {
    console.error('Schema file not found:', schemaFile);
    process.exit(2);
  }
  if (!fs.existsSync(jsonFile)) {
    console.error('JSON file not found:', jsonFile);
    process.exit(2);
  }

  try {
    const Ajv = require('ajv');
    const ajv = new Ajv({ allErrors: true });
    const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf8'));
    let data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

    // If hash missing and file is a top-level artifact, compute it
    if (!data.hash) {
      const { sha256File } = require('./artifact-utils');
      data.hash = sha256File(jsonFile);
      // write-back optional: create a .hashed.json next to original
      fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
      console.log('Computed and injected hash into artifact');
    }

    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (valid) {
      console.log('OK: validation passed');
      process.exit(0);
    } else {
      console.error('Validation errors:');
      console.error(validate.errors);
      process.exit(3);
    }
  } catch (e) {
    console.error('AJV not installed or error loading AJV. To enable structured validation install Ajv:');
    console.log('In PowerShell:');
    console.log('  cd packages/shared; npm install ajv');
    console.log('Then run:');
    console.log('  node validate.js <schema-file> <json-file>');
    console.log('Note: validate.js will compute a SHA256 hash and inject it into the artifact if missing.');
    process.exit(1);
  }
})();
