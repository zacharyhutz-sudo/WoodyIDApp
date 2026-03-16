import { db, Plants, eq } from 'astro:db';

async function fetchPlantPhoto(scientificName: string) {
  try {
    const query = encodeURIComponent(scientificName);
    const response = await fetch(`https://api.inaturalist.org/v1/taxa?q=${query}&is_active=true`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Find exact match if possible, otherwise first result
      const match = data.results.find((r: any) => r.name.toLowerCase() === scientificName.toLowerCase()) || data.results[0];
      return match.default_photo?.medium_url || null;
    }
  } catch (e) {
    console.error(`Failed to fetch for ${scientificName}`, e);
  }
  return null;
}

export default async function() {
  console.log('Fetching photos from iNaturalist...');
  const plants = await db.select().from(Plants);
  let count = 0;

  for (const plant of plants) {
    // Only fetch if imageUrl is missing
    if (!plant.imageUrl) {
      const url = await fetchPlantPhoto(plant.scientificName);
      if (url) {
        await db.update(Plants)
          .set({ imageUrl: url })
          .where(eq(Plants.id, plant.id));
        console.log(`[${++count}] Updated ${plant.scientificName}`);
        // Small delay to be polite to API
        await new Promise(r => setTimeout(r, 200));
      }
    }
  }
  
  console.log('Photo sync complete.');
}
