import { c as createComponent } from './astro-component_CDWWFvb5.mjs';
import 'piccolore';
import { m as maybeRenderHead, r as renderTemplate, h as defineScriptVars, g as renderComponent, e as addAttribute } from './ssr-function_DuAdq3-t.mjs';
import { $ as $$Layout } from './Layout_D1oIFwpG.mjs';
import 'clsx';
import { r as renderScript } from './script_gC6ASInO.mjs';
import { d as db, G as Groups, P as Plants } from './_astro_db_seed_DaYMXNRe.mjs';

const $$CampusMap = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CampusMap;
  const { plants = [], mode = "view" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="map" class="h-[500px] w-full rounded-2xl border border-stone-200 shadow-inner overflow-hidden z-10"></div> <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""> ${renderScript($$result, "/Users/sam/projects/WoodyIDApp/src/components/CampusMap.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sam/projects/WoodyIDApp/src/components/CampusMap.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const groupsData = await db.select().from(Groups);
  const plantsData = await db.select().from(Plants);
  const groups = groupsData.map((group) => ({
    ...group,
    plants: plantsData.filter((p) => p.groupId === group.id)
  }));
  const numberMap = {
    "01": "One",
    "02": "Two",
    "03": "Three",
    "04": "Four",
    "05": "Five",
    "06": "Six",
    "07": "Seven",
    "08": "Eight",
    "09": "Nine",
    "10": "Ten"
  };
  const getDisplayNumber = (name) => {
    const parts = name.split(" ");
    if (parts.length < 2) return name;
    const num = parts[1];
    return numberMap[num] || num;
  };
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", "\n	const viewToggle = document.getElementById('view-toggle');\n	const listsView = document.getElementById('lists-view');\n	const mapsView = document.getElementById('maps-view');\n	const groupWidgets = document.querySelectorAll('.group-widget');\n	const groupDetail = document.getElementById('group-detail');\n	const detailTitle = document.getElementById('detail-title');\n	const detailList = document.getElementById('detail-list');\n	const closeDetail = document.getElementById('close-detail');\n\n	// Toggle between Lists and Maps\n	viewToggle.addEventListener('click', (e) => {\n		const button = e.target.closest('button');\n		if (!button) return;\n\n		const view = button.dataset.view;\n		\n		// Update UI\n		viewToggle.querySelectorAll('button').forEach(btn => {\n			btn.classList.remove('bg-white', 'shadow-sm', 'text-stone-900');\n			btn.classList.add('text-stone-500');\n		});\n		button.classList.add('bg-white', 'shadow-sm', 'text-stone-900');\n		button.classList.remove('text-stone-500');\n\n		if (view === 'lists') {\n			listsView.classList.remove('hidden');\n			mapsView.classList.add('hidden');\n		} else {\n			listsView.classList.add('hidden');\n			mapsView.classList.remove('hidden');\n		}\n	});\n\n	// Handle group selection\n	groupWidgets.forEach(widget => {\n		widget.addEventListener('click', () => {\n			const groupId = widget.dataset.groupId;\n			const group = groups.find(g => g.id === groupId);\n			\n			if (group) {\n				// Update title\n				detailTitle.textContent = group.name;\n				\n				// Clear and inject plants\n				detailList.innerHTML = group.plants.map(plant => `\n					<div class=\"bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:border-green-300 transition-colors\">\n						<div class=\"flex flex-col\">\n							<span class=\"text-sm font-bold text-stone-900\">${plant.scientificName}</span>\n							<span class=\"text-xs italic text-stone-500 mb-1\">${plant.family || ''} ${plant.family ? '•' : ''} ${plant.commonName}</span>\n							${plant.bark ? `<div class=\"mt-2 text-xs text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-100\"><strong>Bark:</strong> ${plant.bark}</div>` : ''}\n						</div>\n					</div>\n				`).join('');\n				\n				// Show detail view\n				groupDetail.classList.remove('hidden');\n				\n				// Scroll to detail\n				groupDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });\n			}\n		});\n	});\n\n	// Close detail view\n	closeDetail.addEventListener('click', () => {\n		groupDetail.classList.add('hidden');\n	});\n})();<\/script>"], ["", " <script>(function(){", "\n	const viewToggle = document.getElementById('view-toggle');\n	const listsView = document.getElementById('lists-view');\n	const mapsView = document.getElementById('maps-view');\n	const groupWidgets = document.querySelectorAll('.group-widget');\n	const groupDetail = document.getElementById('group-detail');\n	const detailTitle = document.getElementById('detail-title');\n	const detailList = document.getElementById('detail-list');\n	const closeDetail = document.getElementById('close-detail');\n\n	// Toggle between Lists and Maps\n	viewToggle.addEventListener('click', (e) => {\n		const button = e.target.closest('button');\n		if (!button) return;\n\n		const view = button.dataset.view;\n		\n		// Update UI\n		viewToggle.querySelectorAll('button').forEach(btn => {\n			btn.classList.remove('bg-white', 'shadow-sm', 'text-stone-900');\n			btn.classList.add('text-stone-500');\n		});\n		button.classList.add('bg-white', 'shadow-sm', 'text-stone-900');\n		button.classList.remove('text-stone-500');\n\n		if (view === 'lists') {\n			listsView.classList.remove('hidden');\n			mapsView.classList.add('hidden');\n		} else {\n			listsView.classList.add('hidden');\n			mapsView.classList.remove('hidden');\n		}\n	});\n\n	// Handle group selection\n	groupWidgets.forEach(widget => {\n		widget.addEventListener('click', () => {\n			const groupId = widget.dataset.groupId;\n			const group = groups.find(g => g.id === groupId);\n			\n			if (group) {\n				// Update title\n				detailTitle.textContent = group.name;\n				\n				// Clear and inject plants\n				detailList.innerHTML = group.plants.map(plant => \\`\n					<div class=\"bg-white border border-stone-200 rounded-xl p-4 shadow-sm hover:border-green-300 transition-colors\">\n						<div class=\"flex flex-col\">\n							<span class=\"text-sm font-bold text-stone-900\">\\${plant.scientificName}</span>\n							<span class=\"text-xs italic text-stone-500 mb-1\">\\${plant.family || ''} \\${plant.family ? '•' : ''} \\${plant.commonName}</span>\n							\\${plant.bark ? \\`<div class=\"mt-2 text-xs text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-100\"><strong>Bark:</strong> \\${plant.bark}</div>\\` : ''}\n						</div>\n					</div>\n				\\`).join('');\n				\n				// Show detail view\n				groupDetail.classList.remove('hidden');\n				\n				// Scroll to detail\n				groupDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });\n			}\n		});\n	});\n\n	// Close detail view\n	closeDetail.addEventListener('click', () => {\n		groupDetail.classList.add('hidden');\n	});\n})();<\/script>"])), renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-stone-50 text-stone-900 font-sans pb-12" data-astro-cid-j7pv25f6> <!-- Header / Toggle --> <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-4" data-astro-cid-j7pv25f6> <div class="max-w-4xl mx-auto flex flex-col items-center gap-4" data-astro-cid-j7pv25f6> <h1 class="text-xl font-bold tracking-tight text-stone-800" data-astro-cid-j7pv25f6>Woody ID</h1> <div class="inline-flex p-1 bg-stone-100 rounded-full border border-stone-200" id="view-toggle" data-astro-cid-j7pv25f6> <button class="px-6 py-1.5 rounded-full text-sm font-medium transition-all bg-white shadow-sm text-stone-900" data-view="lists" data-astro-cid-j7pv25f6>
Lists
</button> <button class="px-6 py-1.5 rounded-full text-sm font-medium transition-all text-stone-500 hover:text-stone-700" data-view="maps" data-astro-cid-j7pv25f6>
Maps
</button> </div> </div> </header> <!-- Lists View --> <div id="lists-view" class="max-w-4xl mx-auto px-4 py-8 space-y-8" data-astro-cid-j7pv25f6> <section data-astro-cid-j7pv25f6> <h2 class="text-sm font-semibold uppercase tracking-wider text-stone-400 mb-4 px-2" data-astro-cid-j7pv25f6>Plant Groups</h2> <div class="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 snap-x no-scrollbar" data-astro-cid-j7pv25f6> ${groups.map((group) => renderTemplate`<button class="group-widget flex-none w-64 h-40 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left snap-start group"${addAttribute(group.id, "data-group-id")} data-astro-cid-j7pv25f6> <div class="flex flex-col h-full justify-between" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <span class="text-xs font-bold text-green-600 uppercase tracking-widest" data-astro-cid-j7pv25f6>Group</span> <h3 class="text-2xl font-bold mt-1 group-hover:text-green-700 transition-colors" data-astro-cid-j7pv25f6>${getDisplayNumber(group.name)}</h3> </div> <div class="text-sm text-stone-500" data-astro-cid-j7pv25f6> ${group.plants.length} Species
</div> </div> </button>`)} </div> </section> <!-- Detail View Container (hidden by default) --> <div id="group-detail" class="hidden animate-in fade-in slide-in-from-bottom-4 duration-300" data-astro-cid-j7pv25f6> <div class="flex items-center justify-between mb-6 px-2" data-astro-cid-j7pv25f6> <h2 id="detail-title" class="text-2xl font-bold" data-astro-cid-j7pv25f6></h2> <button id="close-detail" class="text-sm font-medium text-stone-500 hover:text-stone-900" data-astro-cid-j7pv25f6>Close</button> </div> <div id="detail-list" class="space-y-3" data-astro-cid-j7pv25f6> <!-- Plants will be injected here --> </div> </div> </div> <!-- Maps View --> <div id="maps-view" class="hidden max-w-4xl mx-auto px-4 py-8" data-astro-cid-j7pv25f6> <div class="mb-6" data-astro-cid-j7pv25f6> <h2 class="text-2xl font-bold" data-astro-cid-j7pv25f6>Campus Map</h2> <p class="text-stone-500 text-sm" data-astro-cid-j7pv25f6>Find plants located across the UGA campus.</p> </div> ${renderComponent($$result2, "CampusMap", $$CampusMap, { "data-astro-cid-j7pv25f6": true })} </div> </main> ` }), defineScriptVars({ groups }));
}, "/Users/sam/projects/WoodyIDApp/src/pages/index.astro", void 0);

const $$file = "/Users/sam/projects/WoodyIDApp/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
