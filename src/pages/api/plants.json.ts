import { db, Plants } from 'astro:db';
import { getImage } from 'astro:assets';

export async function GET() {
  const plants = await db.select().from(Plants);
  
  const plantsWithOptimizedImages = await Promise.all(plants.map(async (plant) => {
    let optimizedImageUrl = plant.imageUrl;
    if (plant.imageUrl) {
      try {
        const optimized = await getImage({ 
          src: plant.imageUrl, 
          width: 800, 
          format: 'webp',
          quality: 80
        });
        optimizedImageUrl = optimized.src;
      } catch (e) {
        console.error(`Failed to optimize API image for ${plant.scientificName}:`, e);
      }
    }
    return { ...plant, optimizedImageUrl };
  }));

  return new Response(JSON.stringify(plantsWithOptimizedImages), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
