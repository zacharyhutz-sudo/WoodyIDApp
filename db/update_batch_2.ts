import { db, Plants, eq } from 'astro:db';

const details = {
  // GROUP 4
  "Calycanthus floridus": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Ovate-elliptic", "bark": "Grey-brown, smooth to scaly", "flower": "Maroon, spicy fragrance" },
  "Celtis laevigata": { "leafArrangement": "Alternate", "leafMargin": "Entire/few teeth", "leafShape": "Lanceolate, oblique base", "bark": "Grey, corky 'warts'", "fruit": "Small dark drupe" },
  "Chimonanthus praecox": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Elliptic-ovate", "bark": "Grey-brown, smoothish", "flower": "Yellow, waxy, winter-blooming" },
  "Chionanthus virginicus": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Narrowly elliptic", "bark": "Grey, tight/scaly", "flower": "White, fringe-like" },
  "Clethra alnifolia": { "leafArrangement": "Alternate", "leafMargin": "Serrate (upper half)", "leafShape": "Obovate-oblong", "bark": "Grey-brown, shreddy", "flower": "Fragrant white spikes" },
  "Cornus florida": { "leafArrangement": "Opposite", "leafMargin": "Entire (arcuate veins)", "leafShape": "Ovate-elliptic", "bark": "Blocky, 'alligator' skin", "flower": "4 white/pink bracts" },
  "Cornus kousa": { "leafArrangement": "Opposite", "leafMargin": "Entire (arcuate veins)", "leafShape": "Ovate-elliptic", "bark": "Exfoliating, camo-like", "flower": "4 pointed bracts" },
  "Cotinus coggygria": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Oval-obovate", "bark": "Grey, scalyish", "flower": "Pink/grey smoky panicles" },
  "Cotinus obovatus": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Obovate", "bark": "Grey-black, scaly", "flower": "Smoky panicles" },
  "Fraxinus americana": { "leafArrangement": "Opposite", "leafMargin": "Entire/serrulate", "leafShape": "Pinnately compound (5-9)", "bark": "Grey, diamond-furrowed", "fruit": "Winged samara" },
  "Fraxinus pennsylvanica": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Pinnately compound (5-9)", "bark": "Grey, furrowed", "fruit": "Winged samara" },
  "Koelreuteria bipinnata": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Bipinnately compound", "bark": "Grey, furrowed", "fruit": "Pink papery capsules" },
  "Pistacia chinensis": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Pinnately compound (even)", "bark": "Grey, scaly, orange inner", "fruit": "Red/blue drupes" },
  "Rhus glabra": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Pinnately compound (11-31)", "bark": "Smooth grey, glaucous twigs", "fruit": "Red hairy drupes" },
  "Salix alba 'Tristis'": { "leafArrangement": "Alternate", "leafMargin": "Serrulate", "leafShape": "Linear-lanceolate", "bark": "Grey-brown, furrowed", "fruit": "Capsule" },
  "Tilia americana": { "leafArrangement": "Alternate", "leafMargin": "Coarsely serrate", "leafShape": "Broadly ovate, cordate base", "bark": "Grey, long narrow ridges", "fruit": "Nutlet with leaf-like bract" },
  "Ulmus alata": { "leafArrangement": "Alternate", "leafMargin": "Doubly serrate", "leafShape": "Ovate-oblong", "bark": "Corky ridges on twigs", "fruit": "Small samara" },
  "Ulmus americana": { "leafArrangement": "Alternate", "leafMargin": "Doubly serrate", "leafShape": "Ovate-oblong, rough", "bark": "Grey, spongy/furrowed", "fruit": "Disc-like samara" },
  "Ulmus parvifolia": { "leafArrangement": "Alternate", "leafMargin": "Simply serrate", "leafShape": "Small elliptic", "bark": "Exfoliating, orange-mottled", "fruit": "Autumn samara" },
  "Ulmus pumila": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Small elliptic-ovate", "bark": "Grey, rough/furrowed", "fruit": "Samara" },
  "Zelkova serrata": { "leafArrangement": "Alternate", "leafMargin": "Coarsely serrate", "leafShape": "Ovate-oblong", "bark": "Grey, smooth to scaly", "fruit": "Small drupe" },

  // GROUP 5
  "Bignonia capreolata": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Compound (2 leaflets + tendril)", "bark": "Vinelike", "flower": "Orange-red trumpet" },
  "Campsis radicans": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Pinnately compound (9-11)", "bark": "Light brown, shreddy (vine)", "flower": "Orange trumpet" },
  "Catalpa bignonioides": { "leafArrangement": "Whorled/Opposite", "leafMargin": "Entire", "leafShape": "Large cordate", "bark": "Grey-brown, scaly", "fruit": "Long 'cigar' pod" },
  "Clematis terniflora": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Pinnately compound (3-5)", "bark": "Vinelike", "flower": "Small fragrant white" },
  "Euonymus alatus": { "leafArrangement": "Opposite", "leafMargin": "Finely serrate", "leafShape": "Elliptic-ovate", "bark": "Corky 'wings' on twigs", "fruit": "Red capsule" },
  "Euonymus fortunei var. coloratus": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Elliptic-ovate", "bark": "Vinelike/Groundcover", "fruit": "Pink capsule" },
  "Ficus pumila": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Small ovate (creeping)", "bark": "Vinelike", "fruit": "Fig" },
  "Gelsemium sempervirens": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Lanceolate", "bark": "Twining vine", "flower": "Yellow trumpet" },
  "Hedera helix": { "leafArrangement": "Alternate", "leafMargin": "Entire/Lobed", "leafShape": "Palmately 3-5 lobed", "bark": "Vinelike", "fruit": "Black drupe" },
  "Lonicera fragrantissima": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Broadly ovate", "bark": "Grey, shreddy", "flower": "White, fragrant" },
  "Lonicera japonica": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Ovate-oblong", "bark": "Twining vine", "flower": "White/Yellow" },
  "Lonicera maackii": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Ovate-lanceolate", "bark": "Greyish, striped/shreddy", "fruit": "Red berry" },
  "Lonicera sempervirens": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Oval-elliptic (connate at top)", "bark": "Vinelike", "flower": "Red trumpet" },
  "Parthenocissus quinquefolia": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Palmately compound (5)", "bark": "Vinelike, adhesive discs", "fruit": "Blue-black berry" },
  "Rosa banksiae 'Lutea'": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Pinnately compound (3-5)", "bark": "Thornless vine", "flower": "Small yellow double" },
  "Trachelospermum asiaticum": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Small elliptic", "bark": "Groundcover/Vine", "flower": "Creamy white" },
  "Trachelospermum jasminoides": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Elliptic-lanceolate", "bark": "Twining vine", "flower": "Star-shaped white" },
  "Vinca major": { "leafArrangement": "Opposite", "leafMargin": "Entire (ciliate)", "leafShape": "Cordate-ovate", "bark": "Groundcover", "flower": "Blue-violet" },
  "Vitis rotundifolia": { "leafArrangement": "Alternate", "leafMargin": "Coarsely toothed", "leafShape": "Broadly cordate", "bark": "Smooth brown, unpeeling", "fruit": "Large grape" },
  "Wisteria frutescens": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Pinnately compound (9-15)", "bark": "Twining vine", "flower": "Lilac panicles" },
  "Wisteria sinensis": { "leafArrangement": "Alternate", "leafMargin": "Entire", "leafShape": "Pinnately compound (7-13)", "bark": "Twining vine", "flower": "Long fragrant purple" },

  // GROUP 6
  "Abelia x grandiflora": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Ovate", "bark": "Exfoliating, reddish twigs", "flower": "Pink-white bell" },
  "Amelanchier arborea": { "leafArrangement": "Alternate", "leafMargin": "Finely serrate", "leafShape": "Ovate-elliptic", "bark": "Smooth grey, vertical streaks", "fruit": "Small pome" },
  "Callicarpa americana": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Ovate-elliptic", "bark": "Grey-brown, scalyish", "fruit": "Magenta berries" },
  "Callicarpa dichotoma": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Elliptic-obovate", "bark": "Arching branches", "fruit": "Small purple berries" },
  "Chaenomeles speciosa": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Ovate-oblong", "bark": "Spiny branches", "flower": "Red/Pink cup-like" },
  "Fothergilla major": { "leafArrangement": "Alternate", "leafMargin": "Crenate (upper half)", "leafShape": "Obovate-orbicular", "bark": "Grey, smoothish", "flower": "White 'bottlebrush'" },
  "Hamamelis virginiana": { "leafArrangement": "Alternate", "leafMargin": "Crenate/Lobed", "leafShape": "Obovate, oblique base", "bark": "Grey, smooth to scaly", "flower": "Yellow spider-like (fall)" },
  "Hydrangea macrophylla": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Broadly ovate", "bark": "Stout twigs", "flower": "Blue/Pink mophead" },
  "Hydrangea paniculata": { "leafArrangement": "Whorled/Opposite", "leafMargin": "Serrate", "leafShape": "Ovate-elliptic", "bark": "Grey-brown", "flower": "Large white cone" },
  "Hydrangea quercifolia": { "leafArrangement": "Opposite", "leafMargin": "Lobed", "leafShape": "Oak-like (3-7 lobes)", "bark": "Cinnamon-brown, peeling", "flower": "White cone panicle" },
  "Malus 'Callaway'": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Ovate-elliptic", "bark": "Grey-brown, scaly", "fruit": "Large red crabapple" },
  "Prunus 'Okame'": { "leafArrangement": "Alternate", "leafMargin": "Doubly serrate", "leafShape": "Ovate-elliptic", "bark": "Reddish-brown, lenticels", "flower": "Deep pink" },
  "Prunus persica": { "leafArrangement": "Alternate", "leafMargin": "Serrulate", "leafShape": "Lanceolate", "bark": "Grey, lenticelled", "flower": "Pink/White" },
  "Prunus x yedoensis": { "leafArrangement": "Alternate", "leafMargin": "Doubly serrate", "leafShape": "Elliptic-ovate", "bark": "Grey, distinct lenticels", "flower": "Pale pink/white" },
  "Pyrus calleryana 'Bradford'": { "leafArrangement": "Alternate", "leafMargin": "Crenate", "leafShape": "Broadly ovate", "bark": "Grey-black, blocky", "flower": "White, malodorous" },
  "Spiraea thunbergii": { "leafArrangement": "Alternate", "leafMargin": "Serrate", "leafShape": "Linear-lanceolate", "bark": "Wiry branches", "flower": "Small white clusters" },
  "Spiraea x vanhouttei": { "leafArrangement": "Alternate", "leafMargin": "Serrate/Lobed (apex)", "leafShape": "Rhombic-obovate", "bark": "Arching branches", "flower": "White 'bridal wreath'" },
  "Viburnum macrocephalum": { "leafArrangement": "Opposite", "leafMargin": "Entire/serrulate", "leafShape": "Ovate", "bark": "Stout greyish", "flower": "Large white 'snowball'" },
  "Viburnum plicatum var. tomentosum": { "leafArrangement": "Opposite", "leafMargin": "Serrate", "leafShape": "Ovate-elliptic", "bark": "Horizontal branches", "flower": "Flat lacecap" },
  "Viburnum x pragense": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Elliptic-lanceolate (shiny)", "bark": "Evergreen shrub", "flower": "Creamy white" },
  "Vitex agnus-castus": { "leafArrangement": "Opposite", "leafMargin": "Entire", "leafShape": "Palmately compound (5-7)", "bark": "Grey-brown, furrowed", "flower": "Blue/Lavender spikes" },
};

export default async function() {
  console.log('Updating Groups 4-6...');
  for (const [scientificName, data] of Object.entries(details)) {
    await db.update(Plants).set(data).where(eq(Plants.scientificName, scientificName));
  }
  console.log('Batch update complete.');
}
