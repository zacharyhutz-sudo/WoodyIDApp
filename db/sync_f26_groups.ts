import { db, Groups, Plants, eq } from 'astro:db';
import plantsData from '../src/data/plants.json';
import idDetails from '../src/data/id_details.json';

type IdDetails = {
  leafArrangement?: string;
  leafMargin?: string;
  leafShape?: string;
  leafBase?: string;
  leafApex?: string;
  bark?: string;
  flower?: string;
  fruit?: string;
};

const normalizeName = (value: string) =>
  value
    .normalize('NFKC')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const normalizedDetails = new Map<string, IdDetails>(
  Object.entries(idDetails as Record<string, IdDetails>).map(([scientificName, details]) => [normalizeName(scientificName), details])
);

export default async function syncF26Groups() {
  console.log('Syncing Fall 2026 groups without schema changes...');
  console.log('This script preserves existing Plants.id, latitude, longitude, and imageUrl.');

  const beforePlants = await db.select().from(Plants);
  const beforeById = new Map(beforePlants.map((plant) => [plant.id, plant]));
  const existingByName = new Map(beforePlants.map((plant) => [normalizeName(plant.scientificName), plant]));

  let updated = 0;
  let inserted = 0;
  let missingFromDb = 0;

  for (const group of plantsData) {
    await db.insert(Groups).values({
      id: group.id,
      name: group.name,
    }).onConflictDoUpdate({
      target: Groups.id,
      set: { name: group.name },
    });

    for (const plant of group.plants) {
      const existing = existingByName.get(normalizeName(plant.scientificName));
      const details = normalizedDetails.get(normalizeName(plant.scientificName)) || {};

      if (!existing) {
        missingFromDb += 1;
        const fallbackId = `plant-${plant.scientificName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
        await db.insert(Plants).values({
          id: fallbackId,
          groupId: group.id,
          scientificName: plant.scientificName,
          family: plant.family,
          commonName: plant.commonName,
          leafArrangement: details.leafArrangement || undefined,
          leafMargin: details.leafMargin || undefined,
          leafShape: details.leafShape || undefined,
          leafBase: details.leafBase || undefined,
          leafApex: details.leafApex || undefined,
          bark: details.bark || undefined,
          flower: details.flower || undefined,
          fruit: details.fruit || undefined,
        });
        inserted += 1;
        continue;
      }

      await db.update(Plants).set({
        groupId: group.id,
        scientificName: plant.scientificName,
        family: plant.family,
        commonName: plant.commonName,
        leafArrangement: details.leafArrangement || undefined,
        leafMargin: details.leafMargin || undefined,
        leafShape: details.leafShape || undefined,
        leafBase: details.leafBase || undefined,
        leafApex: details.leafApex || undefined,
        bark: details.bark || undefined,
        flower: details.flower || undefined,
        fruit: details.fruit || undefined,
        // Intentionally do NOT set latitude, longitude, or imageUrl.
      }).where(eq(Plants.id, existing.id));
      updated += 1;
    }
  }

  const afterPlants = await db.select().from(Plants);
  const changedPinsOrImages = afterPlants.filter((after) => {
    const before = beforeById.get(after.id);
    if (!before) return false;
    return before.latitude !== after.latitude || before.longitude !== after.longitude || before.imageUrl !== after.imageUrl;
  });

  if (changedPinsOrImages.length > 0) {
    throw new Error(`Safety check failed: ${changedPinsOrImages.length} existing plant pin/image records changed.`);
  }

  console.log(`Updated existing rows: ${updated}`);
  console.log(`Inserted missing rows: ${inserted}`);
  console.log(`Fall 2026 plants missing from DB before sync: ${missingFromDb}`);
  console.log('Safety check passed: no existing latitude, longitude, or imageUrl values changed.');
}
