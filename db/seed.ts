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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizedDetails = new Map<string, IdDetails>(
  Object.entries(idDetails as Record<string, IdDetails>).map(([scientificName, details]) => [normalizeName(scientificName), details])
);

export default async function seed() {
  console.log('Seeding Fall 2026 groups and plants without overwriting locations/images...');

  const existingPlants = await db.select().from(Plants);
  const existingByName = new Map(existingPlants.map((plant) => [normalizeName(plant.scientificName), plant]));
  const activeNames = new Set<string>();

  for (const group of plantsData) {
    await db.insert(Groups).values({
      id: group.id,
      name: group.name,
    }).onConflictDoUpdate({
      target: Groups.id,
      set: { name: group.name },
    });

    console.log(`Seeding ${group.name}...`);

    for (const plant of group.plants) {
      const normalizedName = normalizeName(plant.scientificName);
      activeNames.add(normalizedName);

      const existing = existingByName.get(normalizedName);
      const plantId = existing?.id || `plant-${slugify(plant.scientificName)}`;
      const details = normalizedDetails.get(normalizedName) || {};

      await db.insert(Plants).values({
        id: plantId,
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
      }).onConflictDoUpdate({
        target: Plants.id,
        set: {
          groupId: group.id,
          scientificName: plant.scientificName,
          commonName: plant.commonName,
          family: plant.family,
          leafArrangement: details.leafArrangement || undefined,
          leafMargin: details.leafMargin || undefined,
          leafShape: details.leafShape || undefined,
          leafBase: details.leafBase || undefined,
          leafApex: details.leafApex || undefined,
          bark: details.bark || undefined,
          flower: details.flower || undefined,
          fruit: details.fruit || undefined,
          // Intentionally do NOT set latitude, longitude, or imageUrl here.
          // Existing campus pin positions and plant images must be preserved.
        },
      });
    }
  }


  console.log(`Seeding complete. Fall 2026 plants processed: ${activeNames.size}.`);
}
