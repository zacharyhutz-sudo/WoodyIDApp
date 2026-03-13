import { db, Plants, eq } from 'astro:db';

const details = {
  // GROUP 1
  "Acer buergerianum": { "leafArrangement": "Opposite", "leafMargin": "Entire to slightly serrate", "leafShape": "3-lobed (trident)", "bark": "Grey-brown, exfoliating", "fruit": "Samara" },
  "Acer ginnala": { "leafArrangement": "Opposite", "leafMargin": "Doubly serrate", "leafShape": "3-lobed, central lobe long", "bark": "Grey-brown, smooth", "fruit": "Samara" },
  "Acer griseum": { "leafArrangement": "Opposite", "leafMargin": "Trifoliate", "leafShape": "Elliptic leaflets", "bark": "Cinnamon-brown, peeling", "fruit": "Samara" },
  "Acer negundo": { "leafArrangement": "Opposite", "leafMargin": "Pinnately compound", "leafShape": "3-7 leaflets", "bark": "Grey-brown, furrowed", "fruit": "Samara" },
  "Acer palmatum": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "5-9 palmately lobed", "bark": "Smooth, green/red/grey", "fruit": "Samara" },
  "Acer rubrum": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "3-5 lobed, V-sinus", "bark": "Smooth grey to shaggy", "fruit": "Samara" },
  "Acer saccharum": { "leafArrangement": "Opposite", "leafMargin": "Entire lobes", "leafShape": "5-lobed, U-sinus", "bark": "Grey-brown, plated", "fruit": "Samara" },
  "Acer x freemanii": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Lobed (intermediate)", "bark": "Grey, smooth to furrowed", "fruit": "Samara" },
  "Alnus serrulata": { "leafArrangement": "Alternate", "leafMargin": "Finely serrate", "leafShape": "Obovate", "bark": "Smooth, greyish-brown", "fruit": "Cone-like (strobile)" },
  "Betula nigra": { "leafArrangement": "Alternate", "leafMargin": "Doubly serrate", "leafShape": "Rhombic-ovate", "bark": "Salmon-pink, peeling", "fruit": "Cone-like" },
  "Carpinus betulus": { "leafArrangement": "Alternate", "leafMargin": "Doubly serrate", "leafShape": "Ovate-oblong", "bark": "Grey, smooth, fluted", "fruit": "Nutlet with 3-lobed bract" },
  "Carpinus caroliniana": { "leafArrangement": "Alternate", "leafMargin": "Doubly serrate", "leafShape": "Ovate", "bark": "Smooth, blue-grey, 'muscle-like'", "fruit": "Nutlet with 3-lobed bract" },
  "Cercidiphyllum japonicum": { "leafArrangement": "Sub-opposite", "leafMargin": "Crenate", "leafShape": "Heart-shaped (cordate)", "bark": "Shaggy, brown-grey", "fruit": "Follicle" },
  "Diospyros virginiana": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Ovate-elliptic", "bark": "Blocky, 'alligator' skin", "fruit": "Orange berry" },
  "Lagerstroemia indica": { "leafArrangement": "Alt/Opp", "leafMargin": "Entire", "leafShape": "Elliptic-oblong", "bark": "Smooth, exfoliating", "flower": "Showy panicles" },
  "Ostrya virginiana": { "leafArrangement": "Alternate", "leafMargin": "Doubly serrate", "leafShape": "Ovate-oblong", "bark": "Brownish, shreddy", "fruit": "Hop-like clusters" },
  "Paulownia tomentosa": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Large cordate", "bark": "Grey-brown, smoothish", "flower": "Purple, upright panicles" },
  "Populus deltoides": { "leafArrangement": "Alternate", "leafMargin": "Crenate-serrate", "leafShape": "Deltoid (triangular)", "bark": "Grey, deeply furrowed", "fruit": "Capsule" },
  "Sapium sebiferum": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Rhombic-ovate", "bark": "Grey, fissured", "fruit": "White waxy seeds" },
  "Sassafras albidum": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Oval/Mitten/3-lobed", "bark": "Reddish-brown, furrowed", "fruit": "Blue drupe" },

  // GROUP 2
  "Castanea mollissima": { "leafArrangement": "Alternate", "leafMargin": "Coarsely serrate", "leafShape": "Elliptic-oblong", "bark": "Grey-brown, furrowed", "fruit": "Spiny bur" },
  "Fagus grandifolia": { "leafArrangement": "Alternate", "leafMargin": "Inconspicuously serrate", "leafShape": "Ovate-oblong", "bark": "Smooth, light grey", "fruit": "Triangular nut in prickly bur" },
  "Liquidambar styraciflua": { "leafArrangement": "Alternate", "leafMargin": "Finely serrate", "leafShape": "Star-shaped (5-7 lobes)", "bark": "Grey, deeply furrowed", "fruit": "Spiny 'gumball'" },
  "Nyssa sylvatica": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Ovate-obovate", "bark": "Blocky, grey-black", "fruit": "Blue-black drupe" },
  "Nyssa aquatica": { "leafArrangement": "Alternate", "leafMargin": "Entire/few teeth", "leafShape": "Ovate-oblong", "bark": "Rough, thin-scaled", "fruit": "Large purple drupe" },
  "Parrotia persica": { "leafArrangement": "Alternate", "leafMargin": "Crenate/wavy", "leafShape": "Ovate-oblong", "bark": "Exfoliating, mosaic", "fruit": "Capsule" },
  "Quercus acutissima": { "leafArrangement": "Alternate", "leafMargin": "Bristle-tipped teeth", "leafShape": "Lanceolate-oblong", "bark": "Grey, corky-furrowed", "fruit": "Acorn, shaggy cup" },
  "Quercus alba": { "leafArrangement": "Alternate", "leafMargin": "Rounded lobes", "leafShape": "Obovate-oblong", "bark": "Light grey, shaggy", "fruit": "Acorn, warty cup" },
  "Quercus coccinea": { "leafArrangement": "Alternate", "leafMargin": "Bristle-tipped lobes", "leafShape": "C-shaped sinuses", "bark": "Grey, dark/furrowed", "fruit": "Acorn, concentric rings at tip" },
  "Quercus falcata": { "leafArrangement": "Alternate", "leafMargin": "Bristle-tipped (3-5 lobes)", "leafShape": "Bell-shaped base", "bark": "Dark grey, deeply fissured", "fruit": "Acorn" },
  "Quercus glauca": { "leafArrangement": "Alternate", "leafMargin": "Serrate (upper half)", "leafShape": "Elliptic-oblong", "bark": "Smooth grey", "fruit": "Acorn, ringed cup" },
  "Quercus lyrata": { "leafArrangement": "Alternate", "leafMargin": "Lobed (irregular)", "leafShape": "Obovate", "bark": "Grey-brown, scaly", "fruit": "Acorn, cup almost covers nut" },
  "Quercus macrocarpa": { "leafArrangement": "Alternate", "leafMargin": "Lobed (waisted center)", "leafShape": "Obovate", "bark": "Grey, corky ridges", "fruit": "Acorn, fringed cup" },
  "Quercus nigra": { "leafArrangement": "Alternate", "leafMargin": "Entire (usually 3-lobed apex)", "leafShape": "Spatulate (spade)", "bark": "Grey-black, tight/furrowed", "fruit": "Small acorn" },
  "Quercus palustris": { "leafArrangement": "Alternate", "leafMargin": "Bristle-tipped lobes", "leafShape": "Deep U-sinuses", "bark": "Smooth grey, pin-like twigs", "fruit": "Acorn, shallow cup" },
  "Quercus phellos": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Linear-lanceolate (willow-like)", "bark": "Grey-black, furrowed", "fruit": "Small acorn" },
  "Quercus robur": { "leafArrangement": "Alternate", "leafMargin": "Rounded lobes", "leafShape": "Auriculate (ear-like) base", "bark": "Grey-brown, deeply furrowed", "fruit": "Long-stalked acorn" },
  "Quercus rubra": { "leafArrangement": "Alternate", "leafMargin": "Bristle-tipped lobes", "leafShape": "Shallow sinuses", "bark": "Grey 'ski-tracks' (flat ridges)", "fruit": "Acorn, flat beret-like cup" },
  "Quercus shumardii": { "leafArrangement": "Alternate", "leafMargin": "Bristle-tipped lobes", "leafShape": "U-shaped sinuses", "bark": "Grey, smooth to furrowed", "fruit": "Acorn, shallow cup" },
  "Quercus stellata": { "leafArrangement": "Alternate", "leafMargin": "Lobed (cross-shaped)", "leafShape": "Obovate", "bark": "Grey, rough-fissured", "fruit": "Small acorn" },
  "Quercus virginiana": { "leafArrangement": "Alternate", "leafMargin": "Entire (rolled edges)", "leafShape": "Elliptic-obovate", "bark": "Blackish, deeply blocky", "fruit": "Small acorn, dark" },

  // GROUP 3
  "Aesculus parviflora": { "leafArrangement": "Opposite", "leafMargin": "Finely serrate", "leafShape": "Palmately compound (5-7)", "bark": "Grey, smooth to scaly", "flower": "Long white panicles" },
  "Albizia julibrissin": { "leafArrangement": "Alternate", "leafMargin": "Entire (leaflets)", "leafShape": "Bipinnately compound", "bark": "Smooth grey", "flower": "Pink powderpuff" },
  "Broussonetia papyrifera": { "leafArrangement": "Alternate", "leafMargin": "Coarsely serrate/lobed", "leafShape": "Cordate/mitten", "bark": "Grey, shallowly fissured", "fruit": "Red globose syncarp" },
  "Carya aquatica": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Pinnately compound (9-13)", "bark": "Grey-brown, shaggy-plated", "fruit": "Flattened nut" },
  "Carya illinoinensis": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Pinnately compound (11-17)", "bark": "Grey-brown, scaly-furrowed", "fruit": "Edible pecan nut" },
  "Carya tomentosa": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Pinnately compound (7-9)", "bark": "Dark grey, diamond-furrowed", "fruit": "Thick-shelled nut" },
  "Cercis canadensis": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Cordate (heart)", "bark": "Dark grey, scaly with age", "flower": "Pink/purple pea-like" },
  "Cladrastis kentukea": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Pinnately compound (7-11)", "bark": "Smooth grey (beech-like)", "flower": "White, drooping panicles" },
  "Halesia carolina": { "leafArrangement": "Alternate", "leafMargin": "Finely serrate", "leafShape": "Ovate-elliptic", "bark": "Grey-brown with white streaks", "flower": "Bell-shaped, white" },
  "Gleditsia triacanthos var. inermis": { "leafArrangement": "Alternate", "leafMargin": "Crenate-serrate", "leafShape": "Pin/Bipinnately compound", "bark": "Grey-black, scaly-plated", "fruit": "Long twisted pod" },
  "Gymnocladus dioica": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Large Bipinnately compound", "bark": "Grey, scaly-furrowed", "fruit": "Short woody pod" },
  "Juglans nigra": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Pinnately compound (15-23)", "bark": "Dark brown, diamond-furrowed", "fruit": "Round nut in green husk" },
  "Liriodendron tulipifera": { "leafArrangement": "Alternate", "leafMargin": "Entire (4-lobed)", "leafShape": "Tulip-shaped", "bark": "Grey, furrowed", "flower": "Yellow-green tulip-like" },
  "Magnolia stellata": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Obovate-oblong", "bark": "Smooth grey", "flower": "White, star-like" },
  "Magnolia x soulangeana": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Obovate", "bark": "Smooth grey", "flower": "Large pink/purple cup" },
  "Morus alba": { "leafArrangement": "Alternate", "leafMargin": "Coarsely serrate/lobed", "leafShape": "Ovate (variable lobes)", "bark": "Yellow-brown, furrowed", "fruit": "White/purple mulberry" },
  "Platanus occidentalis": { "leafArrangement": "Alternate", "leafMargin": "Coarsely toothed (3-5 lobes)", "leafShape": "Broadly ovate", "bark": "Camo-like peeling (white/grey/green)", "fruit": "Fuzzy ball (achene)" },
  "Robinia pseudoacacia": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Pinnately compound (7-19)", "bark": "Dark grey, deeply furrowed", "fruit": "Flat brown pod" },
  "Sophora japonica": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Pinnately compound (7-17)", "bark": "Grey-brown, furrowed", "fruit": "Bumpy green pod" },
  "Styrax japonicus": { "leafArrangement": "Alternate", "leafMargin": "Finely serrate", "leafShape": "Elliptic-ovate", "bark": "Smooth grey-brown, orange fissured", "flower": "Bell-shaped, white" },
};

export default async function() {
  console.log('Updating Groups 1-3...');
  for (const [scientificName, data] of Object.entries(details)) {
    await db.update(Plants).set(data).where(eq(Plants.scientificName, scientificName));
  }
  console.log('Batch update complete.');
}
