import fs from 'node:fs';

const plantsData = JSON.parse(fs.readFileSync(new URL('../src/data/plants.json', import.meta.url), 'utf8'));
const expectedCounts = new Map([
  ['1', 20], ['2', 20], ['3', 20], ['4', 20], ['5', 20],
  ['6', 20], ['7', 21], ['8', 21], ['9', 20], ['10', 20],
]);

const normalizeName = (value) =>
  value
    .normalize('NFKC')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const errors = [];
const seen = new Map();
let total = 0;

if (plantsData.length !== 10) errors.push(`Expected 10 groups; found ${plantsData.length}.`);

for (const group of plantsData) {
  const expected = expectedCounts.get(String(group.id));
  if (expected === undefined) errors.push(`Unexpected group id: ${group.id}.`);
  if (group.plants.length !== expected) {
    errors.push(`${group.name} expected ${expected} plants; found ${group.plants.length}.`);
  }

  group.plants.forEach((plant, index) => {
    total += 1;
    const expectedOrder = index + 1;
    if (plant.sortOrder !== expectedOrder) {
      errors.push(`${group.name} ${plant.scientificName} has sortOrder ${plant.sortOrder}; expected ${expectedOrder}.`);
    }

    const normalized = normalizeName(plant.scientificName);
    if (seen.has(normalized)) {
      errors.push(`Duplicate scientificName: ${plant.scientificName} also appears in ${seen.get(normalized)}.`);
    }
    seen.set(normalized, group.name);
  });
}

if (total !== 202) errors.push(`Expected 202 Fall 2026 plants; found ${total}.`);

const spotChecks = [
  ['1', 15, 'Halesia carolina'],
  ['2', 1, 'Aesculus parviflora'],
  ['3', 10, 'Lagerstroemia indica'],
  ['4', 14, 'Sassafras albidum'],
  ['5', 1, 'Aucuba japonica'],
  ['6', 9, 'Photinia serratifolia'],
  ['7', 11, 'Liquidambar styraciflua'],
  ['8', 21, 'Tsuga canadensis'],
  ['9', 1, 'Agarista populifolia (Leucothoe)'],
  ['10', 3, 'Buxus microphylla'],
];

for (const [groupId, sortOrder, scientificName] of spotChecks) {
  const group = plantsData.find((item) => String(item.id) === groupId);
  const actual = group?.plants.find((plant) => plant.sortOrder === sortOrder);
  if (!actual || actual.scientificName !== scientificName) {
    errors.push(`Spot check failed: Group ${groupId} #${sortOrder} expected ${scientificName}; found ${actual?.scientificName || 'nothing'}.`);
  }
}

if (errors.length > 0) {
  console.error('Fall 2026 data verification failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Fall 2026 data verification passed.');
console.log('Groups: 10');
console.log('Visible active curriculum plants: 202');
console.log('Expected counts: G1-6=20, G7=21, G8=21, G9=20, G10=20');
console.log('Spot checks passed for moved plants and list-order numbering.');
