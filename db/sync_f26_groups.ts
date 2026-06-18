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

const formatPin = (plant: { latitude?: number | null; longitude?: number | null; imageUrl?: string | null }) =>
  `${plant.latitude ?? ''}|${plant.longitude ?? ''}|${plant.imageUrl ?? ''}`;

const pickBestExisting = (plants: any[]) => {
  return plants.sort((a, b) => {
    const aHasData = Number(Boolean(a.latitude && a.longitude)) + Number(Boolean(a.imageUrl));
    const bHasData = Number(Boolean(b.latitude && b.longitude)) + Number(Boolean(b.imageUrl));
    if (aHasData !== bHasData) return bHasData - aHasData;
    if ((a.active === false ? 1 : 0) !== (b.active === false ? 1 : 0)) return a.active === false ? 1 : -1;
    return String(a.id).localeCompare(String(b.id));
  })[0];
};

export default async function syncFall2026Groups() {
  console.log('Syncing Fall 2026 plant groups while preserving existing pins and images...');

  const beforePlants = await db.select().from(Plants);
  const beforePins = new Map(beforePlants.map((plant) => [plant.id, formatPin(plant)]));
  const existingGroups = new Map<string, any[]>();

  for (const plant of beforePlants) {
    const normalized = normalizeName(plant.scientificName);
    existingGroups.set(normalized, [...(existingGroups.get(normalized) || []), plant]);
  }

  const existingByName = new Map<string, any>();
  const chosenExistingIds = new Set<string>();
  for (const [normalizedName, plants] of existingGroups) {
    const chosen = pickBestExisting(plants);
    existingByName.set(normalizedName, chosen);
    chosenExistingIds.add(chosen.id);
  }

  const activeNames = new Set<string>();
  const touchedIds = new Set<string>();
  let inserted = 0;
  let updated = 0;

  for (const group of plantsData) {
    await db.insert(Groups).values({
      id: group.id,
      name: group.name,
    }).onConflictDoUpdate({
      target: Groups.id,
      set: { name: group.name },
    });

    for (const plant of group.plants) {
      const normalizedName = normalizeName(plant.scientificName);
      activeNames.add(normalizedName);

      const existing = existingByName.get(normalizedName);
      const plantId = existing?.id || `plant-${slugify(plant.scientificName)}`;
      const details = normalizedDetails.get(normalizedName) || {};

      const values = {
        id: plantId,
        groupId: group.id,
        scientificName: plant.scientificName,
        family: plant.family,
        commonName: plant.commonName,
        sortOrder: plant.sortOrder,
        active: true,
        leafArrangement: details.leafArrangement || undefined,
        leafMargin: details.leafMargin || undefined,
        leafShape: details.leafShape || undefined,
        leafBase: details.leafBase || undefined,
        leafApex: details.leafApex || undefined,
        bark: details.bark || undefined,
        flower: details.flower || undefined,
        fruit: details.fruit || undefined,
      };

      await db.insert(Plants).values(values).onConflictDoUpdate({
        target: Plants.id,
        set: {
          groupId: values.groupId,
          scientificName: values.scientificName,
          commonName: values.commonName,
          family: values.family,
          sortOrder: values.sortOrder,
          active: true,
          leafArrangement: values.leafArrangement,
          leafMargin: values.leafMargin,
          leafShape: values.leafShape,
          leafBase: values.leafBase,
          leafApex: values.leafApex,
          bark: values.bark,
          flower: values.flower,
          fruit: values.fruit,
          // DO NOT set latitude, longitude, or imageUrl here.
          // This migration is designed to preserve the exact existing pin and photo data.
        },
      });

      touchedIds.add(plantId);
      if (existing) updated += 1;
      else inserted += 1;
    }
  }

  let markedInactive = 0;
  for (const plant of beforePlants) {
    const normalizedName = normalizeName(plant.scientificName);
    const isRemovedFromF26 = !activeNames.has(normalizedName);
    const isDuplicateNotChosen = activeNames.has(normalizedName) && !touchedIds.has(plant.id) && !chosenExistingIds.has(plant.id);

    if (isRemovedFromF26 || isDuplicateNotChosen) {
      await db.update(Plants)
        .set({ active: false })
        .where(eq(Plants.id, plant.id));
      markedInactive += 1;
    }
  }

  const afterPlants = await db.select().from(Plants);
  const changedPinData = afterPlants.filter((plant) => {
    const before = beforePins.get(plant.id);
    return before !== undefined && before !== formatPin(plant);
  });

  if (changedPinData.length > 0) {
    console.error('Migration safety check failed. Pin/image data changed for these existing plants:');
    for (const plant of changedPinData) {
      console.error(`- ${plant.scientificName} (${plant.id})`);
    }
    throw new Error('Aborting: Fall 2026 sync changed existing latitude/longitude/imageUrl data.');
  }

  const activeCount = afterPlants.filter((plant) => plant.active !== false).length;

  console.log('Fall 2026 sync complete.');
  console.log(`Updated existing active plants: ${updated}`);
  console.log(`Inserted new plants: ${inserted}`);
  console.log(`Marked inactive/hidden but preserved: ${markedInactive}`);
  console.log(`Active visible plants now: ${activeCount}`);
  console.log(`Safety check passed: ${beforePins.size} existing plant rows kept the same latitude, longitude, and imageUrl values.`);
}
