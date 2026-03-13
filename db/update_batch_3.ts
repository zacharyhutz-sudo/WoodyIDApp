import { db, Plants, eq } from 'astro:db';

const details = {
  // GROUP 7
  "Berberis thunbergii var. atropurpurea": { "leafArrangement": "Alternate/Fascicled", "leafMargin": "Entire", "leafShape": "Obovate-spatulate", "bark": "Spiny stems", "flower": "Yellow" },
  "Buddleia davidii": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Lanceolate", "bark": "Grey, shreddy", "flower": "Purple spikes" },
  "Cephalotaxus harringtonia": { "leafArrangement": "Spiraled (two-ranked)", "leafMargin": "Entire", "leafShape": "Linear (needle-like)", "bark": "Grey, scaly", "fruit": "Plum-like seed" },
  "Deutzia gracilis": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Lanceolate-ovate", "bark": "Grey-brown", "flower": "Small white" },
  "Edgeworthia chrysantha": { "leafArrangement": "Alternate (clustered)", "leafMargin": "Entire", "leafShape": "Narrowly elliptic", "bark": "Pliable brown branches", "flower": "Yellow, fragrant (winter)" },
  "Forsythia x intermedia": { "leafArrangement": "Opposite", "leafMargin": "Serrate (upper half)", "leafShape": "Ovate-lanceolate", "bark": "Lenticelled grey", "flower": "Yellow bells" },
  "Ginkgo biloba": { "leafArrangement": "Alternate/Fascicled", "leafMargin": "Entire/Lobed", "leafShape": "Fan-shaped", "bark": "Grey, deeply furrowed", "fruit": "Plum-like (foul)" },
  "Hibiscus syriacus": { "leafArrangement": "Alternate", "leafMargin": "Coarsely toothed/Lobed", "leafShape": "Rhombic-ovate", "bark": "Grey, smoothish", "flower": "Large bell (Pink/White/Blue)" },
  "Ilex cassine": { "leafArrangement": "Alternate", "leafMargin": "Entire/Serrate (apex)", "leafShape": "Obovate-oblong", "bark": "Smooth grey", "fruit": "Red drupe" },
  "Ilex cornuta 'Burfordii'": { "leafArrangement": "Alternate", "leafMargin": "Entire (one spine at apex)", "leafShape": "Rectangular-ovate", "bark": "Smooth grey", "fruit": "Red drupe" },
  "Ilex cornuta 'Dwarf Burford'": { "leafArrangement": "Alternate", "leafMargin": "Entire (single spine)", "leafShape": "Small rectangular-ovate", "bark": "Evergreen", "fruit": "Red drupe" },
  "Ilex cornuta 'Rotunda'": { "leafArrangement": "Alternate", "leafMargin": "Spiny (multiple)", "leafShape": "Squarish-ovate", "bark": "Mounded evergreen", "fruit": "Red drupe" },
  "Ilex crenata": { "leafArrangement": "Alternate", "leafMargin": "Crenate (upper half)", "leafShape": "Small elliptic (boxwood-like)", "bark": "Greenish-grey", "fruit": "Black drupe" },
  "Ilex glabra": { "leafArrangement": "Alternate", "leafMargin": "Entire/few teeth (apex)", "leafShape": "Obovate-lanceolate", "bark": "Stoloniferous evergreen", "fruit": "Black drupe" },
  "Ilex opaca": { "leafArrangement": "Alternate", "leafMargin": "Spiny", "leafShape": "Ovate-elliptic (dull green)", "bark": "Smooth grey", "fruit": "Red drupe" },
  "Ilex verticillata": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Ovate-elliptic", "bark": "Deciduous holly", "fruit": "Bright red drupes" },
  "Ilex vomitoria": { "leafArrangement": "Alternate", "leafMargin": "Crenate-serrate", "leafShape": "Small oval", "bark": "Greyish, twiggy", "fruit": "Red drupe" },
  "Ilex x attenuata ‘Savannah’": { "leafArrangement": "Alternate", "leafMargin": "Spiny (upper half)", "leafShape": "Lanceolate-ovate", "bark": "Light grey", "fruit": "Red drupe" },
  "Ilex x 'Nellie R. Stevens'": { "leafArrangement": "Alternate", "leafMargin": "Spiny (1-3 per side)", "leafShape": "Ovate (lustrous)", "bark": "Dense evergreen", "fruit": "Red drupe" },
  "Itea virginica": { "leafArrangement": "Alternate", "leafMargin": "Finely serrate", "leafShape": "Elliptic-obovate", "bark": "Reddish twigs", "flower": "White cylindrical spikes" },
  "Taxus baccata": { "leafArrangement": "Spiraled (two-ranked)", "leafMargin": "Entire", "leafShape": "Linear (needle-like)", "bark": "Red-brown, scaly", "fruit": "Red fleshy aril" },

  // GROUP 8
  "Cedrus deodara": { "leafArrangement": "Alternate/Fascicled", "leafMargin": "Entire", "leafShape": "Needle-like (1-2 in)", "bark": "Grey, scaly-furrowed", "fruit": "Upright cone" },
  "Cedrus atlantica 'Glauca'": { "leafArrangement": "Alternate/Fascicled", "leafMargin": "Entire", "leafShape": "Needle-like (blue-grey)", "bark": "Greyish", "fruit": "Upright cone" },
  "Chamaecyparis thyoides": { "leafArrangement": "Opposite (scale-like)", "leafMargin": "Entire", "leafShape": "Scale-like/Awl-like", "bark": "Reddish-brown, shreddy", "fruit": "Small woody cone" },
  "Cryptomeria japonica": { "leafArrangement": "Spiraled", "leafMargin": "Entire", "leafShape": "Awl-like (curved inward)", "bark": "Reddish-brown, shreddy", "fruit": "Globose cone" },
  "Juniperus chinensis 'Pfitzeriana'": { "leafArrangement": "Whorled/Opposite", "leafMargin": "Entire", "leafShape": "Scale and Awl-like", "bark": "Grey, shreddy", "fruit": "Fleshy berry-like cone" },
  "Juniperus conferta": { "leafArrangement": "Whorled (3)", "leafMargin": "Entire", "leafShape": "Needle-like (spiny)", "bark": "Groundcover", "fruit": "Blue-black cone" },
  "Juniperus procumbens 'Nana'": { "leafArrangement": "Whorled (3)", "leafMargin": "Entire", "leafShape": "Small needle-like", "bark": "Prostrate", "fruit": "Berry-like cone" },
  "Juniperus virginiana": { "leafArrangement": "Opposite (scale/awl)", "leafMargin": "Entire", "leafShape": "Scale and Awl-like", "bark": "Red-brown, shreddy", "fruit": "Blue fleshy cone" },
  "Metasequoia glyptostroboides": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Linear (needle-like, flat)", "bark": "Red-brown, shreddy", "fruit": "Globose cone" },
  "Pinus bungeana": { "leafArrangement": "Fascicled (3)", "leafMargin": "Entire", "leafShape": "Needle-like (stiff)", "bark": "Exfoliating camo-like", "fruit": "Woody cone" },
  "Pinus echinata": { "leafArrangement": "Fascicled (2-3)", "leafMargin": "Entire", "leafShape": "Short needle-like", "bark": "Red-brown plates", "fruit": "Small woody cone" },
  "Pinus palustris": { "leafArrangement": "Fascicled (3)", "leafMargin": "Entire", "leafShape": "Very long needle-like", "bark": "Thick orange-brown plates", "fruit": "Large woody cone" },
  "Pinus strobus": { "leafArrangement": "Fascicled (5)", "leafMargin": "Entire", "leafShape": "Soft needle-like", "bark": "Grey, furrowed", "fruit": "Long curved cone" },
  "Pinus taeda": { "leafArrangement": "Fascicled (3)", "leafMargin": "Entire", "leafShape": "Medium needle-like", "bark": "Grey-black plates", "fruit": "Woody cone" },
  "Pinus thunbergii": { "leafArrangement": "Fascicled (2)", "leafMargin": "Entire", "leafShape": "Stiff needle-like", "bark": "Grey-black, scaly", "fruit": "Woody cone" },
  "Pinus virginiana": { "leafArrangement": "Fascicled (2)", "leafMargin": "Entire", "leafShape": "Short/twisted needle-like", "bark": "Orange-brown, scaly", "fruit": "Woody cone" },
  "Pseudolarix amabilis": { "leafArrangement": "Alternate/Fascicled", "leafMargin": "Entire", "leafShape": "Linear (needle-like, flat)", "bark": "Grey-brown, furrowed", "fruit": "Artichoke-like cone" },
  "Taxodium distichum": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Linear (needle-like, flat)", "bark": "Red-brown, shreddy", "fruit": "Round woody cone" },
  "Thuja ‘Green Giant’": { "leafArrangement": "Opposite (scale-like)", "leafMargin": "Entire", "leafShape": "Scale-like (flattened sprays)", "bark": "Brownish, shreddy", "fruit": "Small cone" },
  "Thuja occidentalis": { "leafArrangement": "Opposite (scale-like)", "leafMargin": "Entire", "leafShape": "Scale-like", "bark": "Grey-brown, shreddy", "fruit": "Small cone" },
  "Tsuga canadensis": { "leafArrangement": "Spiraled (two-ranked)", "leafMargin": "Entire", "leafShape": "Small flat needle-like", "bark": "Grey-brown, furrowed", "fruit": "Small ovoid cone" },

  // GROUP 9
  "Agarista populifolia (Leucothoe)": { "leafArrangement": "Alternate", "leafMargin": "Entire/serrulate", "leafShape": "Lanceolate-ovate", "bark": "Hollow-pith stems", "flower": "Small white bells" },
  "Aucuba japonica": { "leafArrangement": "Opposite", "leafMargin": "Serrate (upper half)", "leafShape": "Elliptic-ovate (spotted)", "bark": "Green stems", "fruit": "Red drupe" },
  "Buxus microphylla": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Small obovate", "bark": "Grey-brown, scaly", "fruit": "Capsule" },
  "Buxus sempervirens": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Elliptic-ovate", "bark": "Grey, corky", "fruit": "Capsule" },
  "Distylium myricoides": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Elliptic-lanceolate (blue-green)", "bark": "Layered growth", "flower": "Small maroon" },
  "Gardenia jasminoides": { "leafArrangement": "Opposite/Whorled", "leafMargin": "Entire", "leafShape": "Elliptic-obovate", "bark": "Evergreen shrub", "flower": "Fragrant white" },
  "Illicium floridanum": { "leafArrangement": "Alternate (clustered)", "leafMargin": "Entire", "leafShape": "Lanceolate-elliptic", "bark": "Anise-scented foliage", "flower": "Maroon/Red" },
  "Illicium parviflorum": { "leafArrangement": "Alternate (clustered)", "leafMargin": "Entire", "leafShape": "Elliptic-ovate", "bark": "Evergreen shrub", "flower": "Small yellow-green" },
  "Jasminum nudiflorum": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Trifoliate", "bark": "Green 4-angled stems", "flower": "Yellow (winter)" },
  "Kalmia latifolia": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Elliptic-lanceolate", "bark": "Red-brown, shreddy", "flower": "Pink/White cup-shaped" },
  "Ligustrum lucidum": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Ovate-elliptic (large)", "bark": "Grey, smoothish", "fruit": "Blue-black drupe" },
  "Ligustrum sinense": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Small elliptic", "bark": "Grey, lenticelled", "fruit": "Blue-black drupe" },
  "Mahonia aquifolium": { "leafArrangement": "Alternate", "leafMargin": "Spiny", "leafShape": "Pinnately compound (5-9)", "bark": "Evergreen", "flower": "Yellow spikes" },
  "Mahonia bealei": { "leafArrangement": "Alternate", "leafMargin": "Spiny", "leafShape": "Pinnately compound (9-13)", "bark": "Stout stems", "flower": "Yellow spikes" },
  "Mahonia 'Soft Caress'": { "leafArrangement": "Alternate", "leafMargin": "Entire (non-spiny)", "leafShape": "Linear-lanceolate leaflets", "bark": "Evergreen", "flower": "Yellow spikes" },
  "Nandina domestica": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Tripinnately compound", "bark": "Cane-like stems", "fruit": "Red berry" },
  "Osmanthus fragrans": { "leafArrangement": "Opposite", "leafMargin": "Entire/serrulate", "leafShape": "Elliptic-ovate", "bark": "Grey, smoothish", "flower": "Tiny white, very fragrant" },
  "Osmanthus heterophyllus": { "leafArrangement": "Opposite", "leafMargin": "Spiny (holly-like)", "leafShape": "Elliptic-ovate", "bark": "Dense evergreen", "flower": "White, fragrant" },
  "Osmanthus x fortunei": { "leafArrangement": "Opposite", "leafMargin": "Finely spiny", "leafShape": "Ovate (intermediate)", "bark": "Dense evergreen", "flower": "White, fragrant" },
  "Rhododendron canescens": { "leafArrangement": "Alternate (clustered)", "leafMargin": "Entire (ciliate)", "leafShape": "Obovate-oblong", "bark": "Twiggy deciduous", "flower": "Pink/White, fragrant" },
  "Rhododendron catawbiense": { "leafArrangement": "Alternate (clustered)", "leafMargin": "Entire", "leafShape": "Elliptic-ovate (large)", "bark": "Grey, scalyish", "flower": "Purple/Lavender" },
};

export default async function() {
  console.log('Updating Groups 7-9...');
  for (const [scientificName, data] of Object.entries(details)) {
    await db.update(Plants).set(data).where(eq(Plants.scientificName, scientificName));
  }
  console.log('Batch update complete.');
}
