import fs from 'node:fs';

const groups = JSON.parse(fs.readFileSync('src/data/plants.json', 'utf8'));
const approved = JSON.parse(fs.readFileSync('src/data/approved_images.json', 'utf8'));

function normalize(value) {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const f26Names = new Set();
for (const group of groups) {
  for (const plant of group.plants || []) {
    f26Names.add(normalize(plant.scientificName));
  }
}

const errors = [];
const seen = new Set();
for (const image of approved) {
  const key = normalize(image.scientificName);
  if (!key) errors.push('Approved image entry is missing scientificName.');
  if (seen.has(key)) errors.push(`Duplicate approved image override for ${image.scientificName}.`);
  seen.add(key);
  if (!f26Names.has(key)) errors.push(`Approved image override does not match a Fall 2026 plant: ${image.scientificName}`);
  if (!image.imageUrl || !/^https:\/\//.test(image.imageUrl)) errors.push(`Approved image URL must be https for ${image.scientificName}.`);
  if (!image.sourcePage) errors.push(`Approved image needs sourcePage for ${image.scientificName}.`);
  if (!image.license) errors.push(`Approved image needs license note for ${image.scientificName}.`);
}

if (errors.length) {
  console.error('Image override verification failed:');
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log(`Image override verification passed: ${approved.length} approved display overrides.`);
