import { db, Plants, eq } from 'astro:db';

const details = {
  // GROUP 10
  "Acca sellowiana": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Elliptic", "bark": "Grey, peeling scaly", "flower": "White/Red edible" },
  "Butia capitata": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Pinnately compound (palm)", "bark": "Stocky trunk, leaf scars", "fruit": "Yellow orange drupe" },
  "Camellia japonica": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Ovate-elliptic (large)", "bark": "Smooth grey", "flower": "Large various colors" },
  "Camellia sasanqua": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Small elliptic", "bark": "Smooth grey", "flower": "Smaller various colors" },
  "Camellia sinensis": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Elliptic-oblong", "bark": "Evergreen shrub", "flower": "White" },
  "Fatsia japonica": { "leafArrangement": "Alternate", "leafMargin": "Lobed", "leafShape": "Palmately 7-9 lobed (large)", "bark": "Evergreen shrub", "flower": "White umbels" },
  "Loropetalum chinense": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Small ovate", "bark": "Twiggy evergreen", "flower": "White strap-like" },
  "Loropetalum chinense var. rubrum": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Small ovate (purple)", "bark": "Twiggy evergreen", "flower": "Pink strap-like" },
  "Magnolia grandiflora": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Elliptic-oblong (large)", "bark": "Grey, smooth to scaly", "flower": "Large white fragrant" },
  "Magnolia virginiana": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Elliptic-oblong", "bark": "Smooth grey", "flower": "Creamy white fragrant" },
  "Myrica cerifera": { "leafArrangement": "Alternate", "leafMargin": "Serrate (apex)", "leafShape": "Oblanceolate (spotted)", "bark": "Grey, smooth", "fruit": "Grey waxy berries" },
  "Myrica rubra": { "leafArrangement": "Alternate", "leafMargin": "Entire/serrulate", "leafShape": "Oblanceolate-oblong", "bark": "Evergreen tree", "fruit": "Red bumpy drupe" },
  "Photinia serratifolia": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Oblong-lanceolate (large)", "bark": "Grey-brown", "flower": "White panicles" },
  "Poncirus trifoliata": { "leafArrangement": "Alternate", "leafMargin": "Crenate", "leafShape": "Trifoliate", "bark": "Green spiny stems", "fruit": "Small yellow fuzzy" },
  "Prunus caroliniana": { "leafArrangement": "Alternate", "leafMargin": "Entire/serrulate", "leafShape": "Elliptic-oblong", "bark": "Smooth grey-black", "flower": "White racemes" },
  "Prunus laurocerasus": { "leafArrangement": "Alternate", "leafMargin": "Serrate (distal)", "leafShape": "Oblong-elliptic (large)", "bark": "Smooth grey", "flower": "White upright spikes" },
  "Prunus laurocerasus 'Otto Luyken'": { "leafArrangement": "Alternate", "leafMargin": "Serrate (distal)", "leafShape": "Narrowly oblong", "bark": "Compact evergreen", "flower": "White upright spikes" },
  "Rhaphiolepis umbellata": { "leafArrangement": "Alternate", "leafMargin": "Crenate-serrate", "leafShape": "Obovate-elliptic (leathery)", "bark": "Evergreen shrub", "flower": "White/Pink umbels" },
  "Rhapidophyllum hystrix": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Palmate (palm)", "bark": "Spiny needle trunk", "fruit": "Fuzzy drupe" },
  "Sabal minor": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Palmate (palm)", "bark": "Trunkless palm", "fruit": "Black drupe" },
  "Sabal palmetto": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Costapalmate (palm)", "bark": "Cross-hatched trunk", "fruit": "Black drupe" },
  "Ternstroemia gymnanthera": { "leafArrangement": "Alternate (clustered)", "leafMargin": "Entire", "leafShape": "Obovate-elliptic", "bark": "Smooth grey", "flower": "Creamy white" },
  "Trachycarpus fortunei": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Palmate (palm)", "bark": "Hairy fibrous trunk", "fruit": "Blue-black drupe" },
};

export default async function() {
  console.log('Updating Group 10...');
  for (const [scientificName, data] of Object.entries(details)) {
    await db.update(Plants).set(data).where(eq(Plants.scientificName, scientificName));
  }
  console.log('Batch update complete.');
}
