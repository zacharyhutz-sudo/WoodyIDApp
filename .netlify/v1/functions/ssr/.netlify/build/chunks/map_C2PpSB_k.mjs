import { c as createComponent } from './astro-component_CDWWFvb5.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from './ssr-function_DuAdq3-t.mjs';
import { r as renderScript } from './script_gC6ASInO.mjs';
import { $ as $$Layout } from './Layout_D1oIFwpG.mjs';
import { d as db, P as Plants } from './_astro_db_seed_DaYMXNRe.mjs';

const $$Map = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Map;
  const cookie = Astro2.request.headers.get("cookie");
  const isAuthenticated = cookie?.includes("auth=ugawoodies");
  if (!isAuthenticated) return Astro2.redirect("/admin");
  const plants = await db.select().from(Plants);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col"> <header class="bg-white border-b border-stone-200 p-4 flex justify-between items-center"> <div class="flex items-center gap-4"> <a href="/admin" class="text-stone-400 hover:text-stone-900 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg> </a> <h1 class="text-xl font-bold">Map Editor</h1> </div> <p class="text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1 rounded-full">Drag pins to set plant locations</p> </header> <div class="flex-grow relative"> <div id="admin-map" class="absolute inset-0 z-10"></div> <!-- Plant Picker Sidebar --> <div class="absolute top-4 left-4 z-20 w-72 max-h-[calc(100%-2rem)] bg-white/90 backdrop-blur shadow-2xl rounded-2xl border border-stone-200 flex flex-col overflow-hidden"> <div class="p-4 border-b border-stone-100"> <input type="text" id="plant-search" placeholder="Search plants..." class="w-full px-3 py-2 bg-stone-50 border border-stone-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"> </div> <div class="flex-grow overflow-y-auto p-2 space-y-1" id="unplaced-list"> ${plants.map((plant) => renderTemplate`<div class="plant-item p-3 rounded-xl border border-transparent hover:border-blue-200 hover:bg-blue-50 cursor-move transition-all group" draggable="true"${addAttribute(plant.id, "data-id")}${addAttribute(plant.scientificName, "data-name")}> <div class="text-sm font-bold text-stone-800 truncate">${plant.scientificName}</div> <div class="text-[10px] text-stone-500 truncate">${plant.commonName}</div> ${plant.latitude && renderTemplate`<div class="mt-1 text-[9px] font-black text-green-600 uppercase tracking-tighter">✓ Placed</div>`} </div>`)} </div> </div> </div> </main> ` })} <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"> ${renderScript($$result, "/Users/sam/projects/WoodyIDApp/src/pages/admin/map.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sam/projects/WoodyIDApp/src/pages/admin/map.astro", void 0);

const $$file = "/Users/sam/projects/WoodyIDApp/src/pages/admin/map.astro";
const $$url = "/admin/map";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Map,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
