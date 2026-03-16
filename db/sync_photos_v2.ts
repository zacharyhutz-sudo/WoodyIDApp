import { db, Plants, eq } from 'astro:db';

async function fetchPlantPhoto(name: string) {
  try {
    // Simplify name for API (e.g., remove cultivars or extra descriptors)
    const cleanName = name.split("'")[0].split('var.')[0].split('‘')[0].trim();
    console.log(`Searching for: ${cleanName} (original: ${name})`);
    
    const query = encodeURIComponent(cleanName);
    const response = await fetch(`https://api.inaturalist.org/v1/taxa?q=${query}&is_active=true`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].default_photo?.medium_url || null;
    }
  } catch (e) {
    console.error(`Failed to fetch for ${name}`, e);
  }
  return null;
}

export default async function() {
  const plants = await db.select().from(Plants);
  let count = 0;

  for (const plant of plants) {
    if (!plant.imageUrl) {
      const url = await fetchPlantPhoto(plant.scientificName);
      if (url) {
        await db.update(Plants)
          .set({ imageUrl: url })
          .where(eq(Plants.id, plant.id));
        console.log(`[${++count}] Fixed ${plant.scientificName}`);
        await new Promise(r => setTimeout(r, 500));
      } else {
        console.log(`[!] Still no result for ${plant.scientificName}`);
      }
    }
  }
}
