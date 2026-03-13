import { db, Groups, Plants } from 'astro:db';
import plantsData from '../src/data/plants.json';

export default async function seed() {
  console.log('Seeding groups...');
  for (const group of plantsData) {
    // Insert Group
    await db.insert(Groups).values({
      id: group.id,
      name: group.name,
    }).onConflictDoUpdate({
      target: Groups.id,
      set: { name: group.name }
    });

    console.log(`Seeding plants for ${group.name}...`);
    for (const plant of group.plants) {
      // Use a deterministic ID for seeding so we don't duplicate on every run
      // A simple slug of scientific name + group id
      const plantId = `${group.id}-${plant.scientificName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      
      await db.insert(Plants).values({
        id: plantId,
        groupId: group.id,
        scientificName: plant.scientificName,
        family: plant.family,
        commonName: plant.commonName,
      }).onConflictDoUpdate({
        target: Plants.id,
        set: {
          scientificName: plant.scientificName,
          commonName: plant.commonName,
          family: plant.family
        }
      });
    }
  }
  console.log('Seeding complete!');
}
