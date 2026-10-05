import { db, Plants } from 'astro:db';
import { getImage } from 'astro:assets';
import { applyF26Curriculum, sortPlantsByGroupOrder } from '../../utils/plantSort';
import { resolvePlantImages } from '../../utils/plantImages';

export async function GET() {
  const plants = resolvePlantImages(sortPlantsByGroupOrder(applyF26Curriculum(await db.select().from(Plants))));
  
	const plantsWithOptimizedImages = await Promise.all(plants.map(async (plant) => {
		const sourceImageUrl = plant.displayImageUrl || plant.imageUrl;
		let optimizedImageUrl = sourceImageUrl;
		let thumbnailImageUrl = sourceImageUrl;
		if (sourceImageUrl) {
      try {
        const optimized = await getImage({ 
          src: sourceImageUrl, 
          width: 800, 
          format: 'webp',
          quality: 80
        });
        optimizedImageUrl = optimized.src;
			} catch (e) {
				console.error(`Failed to optimize API image for ${plant.scientificName}:`, e);
			}
			try {
				const thumbnail = await getImage({
					src: sourceImageUrl,
					width: 192,
					format: 'webp',
					quality: 72
				});
				thumbnailImageUrl = thumbnail.src;
			} catch (e) {
				console.error(`Failed to create API thumbnail for ${plant.scientificName}:`, e);
			}
		}
		return { ...plant, optimizedImageUrl, thumbnailImageUrl };
  }));

  return new Response(JSON.stringify(plantsWithOptimizedImages), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
