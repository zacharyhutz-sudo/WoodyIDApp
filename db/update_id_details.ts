import { db, Plants, eq } from 'astro:db';
import details from '../src/data/id_details.json';

export default async function updateDetails() {
  console.log('Updating botanical details for ID guide...');
  
  const plantEntries = Object.entries(details);
  let count = 0;

  for (const [scientificName, data] of plantEntries) {
    const result = await db.update(Plants)
      .set({
        leafArrangement: data.leafArrangement || null,
        leafMargin: data.leafMargin || null,
        leafShape: data.leafShape || null,
        bark: data.bark || null,
        fruit: data.fruit || null,
        flower: data.flower || null
      })
      .where(eq(Plants.scientificName, scientificName));
    
    count++;
    console.log(`Updated: ${scientificName}`);
  }

  console.log(`Done! Updated details for ${count} species.`);
}
