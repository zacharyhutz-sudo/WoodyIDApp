import fs from 'node:fs';

const plantsData = JSON.parse(fs.readFileSync(new URL('../src/data/plants.json', import.meta.url), 'utf8'));

// Reference: uploaded PlantList01F26(1).docx through PlantList10F26(1).docx.
// Group 07 follows the DOCX, NOT the conflicting Group 07 PDF.
// Keep the app's separately listed Loropetalum and Cedrus companion entries.
// This group-only correction does not add the parenthetical Myrica rubra note.
// These names are an independent reference, not derived from plants.json.
const expectedNamesByGroup = {
  "1": [
    "Acer buergerianum",
    "Acer ginnala",
    "Acer griseum",
    "Acer negundo",
    "Acer palmatum",
    "Acer rubrum",
    "Acer saccharum",
    "Acer x freemanii",
    "Alnus serrulata",
    "Betula nigra",
    "Carpinus betulus",
    "Carpinus caroliniana",
    "Cercidiphyllum japonicum",
    "Diospyros virginiana",
    "Halesia carolina",
    "Ostrya virginiana",
    "Populus deltoides",
    "Salix alba 'Tristis'",
    "Styrax japonicus",
    "Sapium sebiferum"
  ],
  "2": [
    "Aesculus parviflora",
    "Castanea mollissima",
    "Fagus grandifolia",
    "Nyssa sylvatica",
    "Platanus occidentalis",
    "Quercus acutissima",
    "Quercus alba",
    "Quercus coccinea",
    "Quercus falcata",
    "Quercus glauca",
    "Quercus lyrata",
    "Quercus macrocarpa",
    "Quercus nigra",
    "Quercus palustris",
    "Quercus phellos",
    "Quercus robur",
    "Quercus rubra",
    "Quercus shumardii",
    "Quercus stellata",
    "Quercus virginiana"
  ],
  "3": [
    "Albizia julibrissin",
    "Carya aquatica",
    "Carya illinoinensis",
    "Carya tomentosa",
    "Cercis canadensis",
    "Cladrastis kentukea",
    "Gleditsia triacanthos var. inermis",
    "Gymnocladus dioica",
    "Juglans nigra",
    "Lagerstroemia indica",
    "Liriodendron tulipifera",
    "Magnolia grandiflora",
    "Magnolia stellata",
    "Magnolia x soulangeana",
    "Magnolia virginiana",
    "Paulownia tomentosa",
    "Robinia pseudoacacia",
    "Sophora japonica",
    "Wisteria frutescens",
    "Wisteria sinensis"
  ],
  "4": [
    "Calycanthus floridus",
    "Celtis laevigata",
    "Chimonanthus praecox",
    "Chionanthus virginicus",
    "Forsythia x intermedia",
    "Fraxinus americana",
    "Fraxinus pennsylvanica",
    "Jasminum nudiflorum",
    "Koelreuteria bipinnata",
    "Ligustrum lucidum",
    "Ligustrum sinense",
    "Osmanthus fragrans",
    "Osmanthus x fortunei",
    "Sassafras albidum",
    "Tilia americana",
    "Ulmus alata",
    "Ulmus americana",
    "Ulmus parvifolia",
    "Ulmus pumila",
    "Zelkova serrata"
  ],
  "5": [
    "Aucuba japonica",
    "Bignonia capreolata",
    "Broussonetia papyrifera",
    "Buddleia davidii",
    "Campsis radicans",
    "Catalpa bignonioides",
    "Cornus florida",
    "Cornus kousa",
    "Cotinus coggygria",
    "Euonymus alatus",
    "Euonymus fortunei var. coloratus",
    "Ficus pumila",
    "Gelsemium sempervirens",
    "Morus alba",
    "Parthenocissus quinquefolia",
    "Pistacia chinensis",
    "Rhus glabra",
    "Trachelospermum asiaticum",
    "Vinca major",
    "Vitis rotundifolia"
  ],
  "6": [
    "Amelanchier arborea",
    "Callicarpa americana",
    "Chaenomeles speciosa",
    "Deutzia gracilis",
    "Hydrangea macrophylla",
    "Hydrangea paniculata",
    "Hydrangea quercifolia",
    "Malus 'Callaway'",
    "Photinia serratifolia",
    "Prunus 'Okame'",
    "Prunus caroliniana",
    "Prunus laurocerasus",
    "Prunus persica",
    "Prunus x yedoensis",
    "Pyrus calleryana 'Bradford'",
    "Rhaphiolepis umbellata",
    "Rosa banksiae 'Lutea'",
    "Spiraea thunbergii",
    "Spiraea x vanhouttei",
    "Vitex agnus-castus"
  ],
  "7": [
    "Abelia x grandiflora",
    "Acca sellowiana",
    "Clematis terniflora",
    "Clethra alnifolia",
    "Distylium myricoides",
    "Edgeworthia chrysantha",
    "Fothergilla major",
    "Hamamelis virginiana",
    "Hibiscus syriacus",
    "Itea virginica",
    "Liquidambar styraciflua",
    "Lonicera fragrantissima",
    "Lonicera japonica",
    "Lonicera maackii",
    "Lonicera sempervirens",
    "Loropetalum chinense",
    "Loropetalum chinense var. rubrum",
    "Parrotia persica",
    "Viburnum macrocephalum",
    "Viburnum plicatum var. tomentosum",
    "Viburnum x pragense"
  ],
  "8": [
    "Cedrus deodara",
    "Cedrus atlantica 'Glauca'",
    "Chamaecyparis thyoides",
    "Cryptomeria japonica",
    "Juniperus chinensis 'Pfitzeriana'",
    "Juniperus conferta",
    "Juniperus procumbens 'Nana'",
    "Juniperus virginiana",
    "Metasequoia glyptostroboides",
    "Pinus bungeana",
    "Pinus echinata",
    "Pinus palustris",
    "Pinus strobus",
    "Pinus taeda",
    "Pinus thunbergii",
    "Pinus virginiana",
    "Pseudolarix amabilis",
    "Taxodium distichum",
    "Thuja ‘Green Giant’",
    "Thuja occidentalis",
    "Tsuga canadensis"
  ],
  "9": [
    "Agarista populifolia (Leucothoe)",
    "Berberis thunbergii var. atropurpurea",
    "Ginkgo biloba",
    "Ilex cassine",
    "Ilex cornuta 'Burfordii'",
    "Ilex cornuta 'Rotunda'",
    "Ilex crenata",
    "Ilex glabra",
    "Ilex opaca",
    "Ilex verticillata",
    "Ilex vomitoria",
    "Ilex x attenuata ‘Savannah’",
    "Ilex x 'Nellie R. Stevens'",
    "Kalmia latifolia",
    "Mahonia aquifolium",
    "Mahonia bealei",
    "Mahonia 'Soft Caress'",
    "Nandina domestica",
    "Rhododendron canescens",
    "Rhododendron catawbiense"
  ],
  "10": [
    "Butia capitata",
    "Buxus microphylla",
    "Buxus sempervirens",
    "Camellia japonica",
    "Camellia sasanqua",
    "Camellia sinensis",
    "Cephalotaxus harringtonia",
    "Fatsia japonica",
    "Gardenia jasminoides",
    "Hedera helix",
    "Illicium floridanum",
    "Illicium parviflorum",
    "Myrica cerifera",
    "Poncirus trifoliata",
    "Rhapidophyllum hystrix",
    "Sabal minor",
    "Sabal palmetto",
    "Taxus baccata",
    "Ternstroemia gymnanthera",
    "Trachycarpus fortunei"
  ]
};

const expectedCounts = new Map([
  ['1', 20], ['2', 20], ['3', 20], ['4', 20], ['5', 20],
  ['6', 20], ['7', 21], ['8', 21], ['9', 20], ['10', 20],
]);

const normalizeName = (value) =>
  String(value ?? '')
    .normalize('NFKC')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const errors = [];
const seenPlants = new Map();
const seenGroups = new Set();
let total = 0;

if (!Array.isArray(plantsData)) {
  console.error('Fall 2026 data verification failed: plants.json must be an array.');
  process.exit(1);
}

if (plantsData.length !== 10) errors.push(`Expected 10 groups; found ${plantsData.length}.`);

for (const group of plantsData) {
  if (!group || typeof group !== 'object' || Array.isArray(group)) {
    errors.push('Invalid group entry: expected an object.');
    continue;
  }

  const groupId = String(group.id);
  const label = group.name || `Group ${groupId}`;
  const expectedCount = expectedCounts.get(groupId);
  const expectedNames = expectedNamesByGroup[groupId];

  if (seenGroups.has(groupId)) errors.push(`Duplicate group id: ${groupId}.`);
  seenGroups.add(groupId);
  if (expectedCount === undefined) errors.push(`Unexpected group id: ${groupId}.`);
  if (typeof group.id !== 'string') errors.push(`${label} must have a string id.`);
  if (!Array.isArray(group.plants)) {
    errors.push(`${label} must have a plants array.`);
    continue;
  }
  if (group.plants.length !== expectedCount) {
    errors.push(`${label} expected ${expectedCount} plants; found ${group.plants.length}.`);
  }

  group.plants.forEach((plant, index) => {
    total += 1;
    const expectedOrder = index + 1;
    if (!plant || typeof plant !== 'object' || Array.isArray(plant)) {
      errors.push(`${label} #${expectedOrder} is not a plant object.`);
      return;
    }
    if (plant.sortOrder !== expectedOrder) {
      errors.push(`${label} ${plant.scientificName} has sortOrder ${plant.sortOrder}; expected ${expectedOrder}.`);
    }

    const normalized = normalizeName(plant.scientificName);
    if (typeof plant.scientificName !== 'string' || !normalized) {
      errors.push(`${label} #${expectedOrder} is missing a valid scientificName.`);
    }
    if (seenPlants.has(normalized)) {
      errors.push(`Duplicate scientificName: ${plant.scientificName} also appears in ${seenPlants.get(normalized)}.`);
    }
    seenPlants.set(normalized, label);

    const expectedName = expectedNames?.[index];
    if (expectedName === undefined || normalized !== normalizeName(expectedName)) {
      errors.push(`${label} #${expectedOrder} expected ${expectedName ?? 'no additional plant'}; found ${plant.scientificName ?? 'nothing'}.`);
    }
  });
}

for (const groupId of expectedCounts.keys()) {
  if (!seenGroups.has(groupId)) errors.push(`Missing group id: ${groupId}.`);
}

if (total !== 202) errors.push(`Expected 202 Fall 2026 plants; found ${total}.`);

if (errors.length > 0) {
  console.error('Fall 2026 data verification failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Fall 2026 data verification passed (DOCX group assignments).');
console.log('Groups: 10');
console.log('Visible active curriculum plants: 202');
console.log('Expected counts: G1-6=20, G7=21, G8=21, G9=20, G10=20');
console.log('All 202 plants match the DOCX group membership and list sequence.');
