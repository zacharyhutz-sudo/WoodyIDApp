import { c as createComponent } from './astro-component_CDWWFvb5.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from './ssr-function_DuAdq3-t.mjs';
import { $ as $$Layout } from './Layout_D1oIFwpG.mjs';
import { d as db, G as Groups, P as Plants } from './_astro_db_seed_DaYMXNRe.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const $$groupId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$groupId;
  const { groupId } = Astro2.params;
  const cookie = Astro2.request.headers.get("cookie");
  const isAuthenticated = cookie?.includes("auth=ugawoodies");
  if (!isAuthenticated) {
    return Astro2.redirect("/admin");
  }
  const group = (await db.select().from(Groups).where(eq(Groups.id, groupId)))[0];
  if (!group) return Astro2.redirect("/admin");
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action");
    if (action === "add-plant") {
      await db.insert(Plants).values({
        id: crypto.randomUUID(),
        groupId: group.id,
        scientificName: formData.get("scientificName"),
        commonName: formData.get("commonName"),
        family: formData.get("family"),
        imageUrl: formData.get("imageUrl"),
        leafArrangement: formData.get("leafArrangement"),
        leafMargin: formData.get("leafMargin"),
        leafShape: formData.get("leafShape"),
        leafBase: formData.get("leafBase"),
        leafApex: formData.get("leafApex"),
        bark: formData.get("bark"),
        flower: formData.get("flower"),
        fruit: formData.get("fruit")
      });
    }
    if (action === "delete-plant") {
      const id = formData.get("id");
      await db.delete(Plants).where(eq(Plants.id, id));
    }
    if (isAuthenticated && action === "update-location") {
      const id = formData.get("id");
      const lat = parseFloat(formData.get("lat"));
      const lng = parseFloat(formData.get("lng"));
      await db.update(Plants).set({ latitude: lat, longitude: lng }).where(eq(Plants.id, id));
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
  }
  const plants = await db.select().from(Plants).where(eq(Plants.groupId, group.id));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-stone-50 text-stone-900 font-sans p-4 md:p-12"> <div class="max-w-5xl mx-auto"> <header class="mb-12"> <a href="/admin" class="text-sm font-bold text-stone-400 hover:text-green-600 transition-colors uppercase tracking-widest mb-2 block">← Back to Dashboard</a> <h1 class="text-4xl font-bold italic tracking-tight">${group.name}</h1> <p class="text-stone-500 mt-2">Managing ${plants.length} species in this collection.</p> </header> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Add Plant Form --> <div class="lg:col-span-1"> <div class="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm sticky top-24"> <h2 class="text-xl font-bold mb-6">Add New Plant</h2> <form method="POST" class="space-y-4"> <input type="hidden" name="action" value="add-plant"> <div class="space-y-1"> <label class="text-[10px] font-black uppercase text-stone-400 px-1">Scientific Name</label> <input name="scientificName" required class="w-full px-4 py-2 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500"> </div> <div class="space-y-1"> <label class="text-[10px] font-black uppercase text-stone-400 px-1">Common Name</label> <input name="commonName" required class="w-full px-4 py-2 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500"> </div> <div class="space-y-1"> <label class="text-[10px] font-black uppercase text-stone-400 px-1">Family</label> <input name="family" class="w-full px-4 py-2 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500"> </div> <div class="space-y-1"> <label class="text-[10px] font-black uppercase text-stone-400 px-1">Image URL</label> <input name="imageUrl" placeholder="https://..." class="w-full px-4 py-2 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500"> </div> <div class="pt-4 border-t border-stone-100"> <h3 class="text-xs font-bold text-stone-400 uppercase mb-4 tracking-widest">ID Features</h3> <div class="grid grid-cols-1 gap-3"> ${[
    { key: "leafArrangement", label: "Leaf Arrangement" },
    { key: "leafMargin", label: "Leaf Margin" },
    { key: "leafShape", label: "Leaf Shape" },
    { key: "leafBase", label: "Leaf Base" },
    { key: "leafApex", label: "Leaf Apex" },
    { key: "bark", label: "Bark" },
    { key: "flower", label: "Flower" },
    { key: "fruit", label: "Fruit" }
  ].map((feat) => renderTemplate`<div class="space-y-1"> <label class="text-[9px] font-bold text-stone-400 px-1">${feat.label.toUpperCase()}</label> <input${addAttribute(feat.key, "name")} class="w-full px-3 py-1.5 bg-stone-50 border border-stone-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"> </div>`)} </div> </div> <button type="submit" class="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg mt-4">
Add to Group
</button> </form> </div> </div> <!-- Plant List --> <div class="lg:col-span-2"> <div class="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden"> <table class="w-full text-left"> <thead class="bg-stone-50 border-b border-stone-100"> <tr> <th class="px-6 py-4 text-[10px] font-black uppercase text-stone-400">Species</th> <th class="px-6 py-4 text-[10px] font-black uppercase text-stone-400">Features</th> <th class="px-6 py-4"></th> </tr> </thead> <tbody class="divide-y divide-stone-100"> ${plants.map((plant) => renderTemplate`<tr class="group hover:bg-stone-50/50 transition-colors"> <td class="px-6 py-4"> <div class="font-bold text-stone-800">${plant.scientificName}</div> <div class="text-sm text-stone-500">${plant.commonName}</div> <div class="text-[10px] italic text-stone-400">${plant.family}</div> </td> <td class="px-6 py-4"> <div class="flex flex-wrap gap-1"> ${plant.leafArrangement && renderTemplate`<span class="px-2 py-0.5 bg-green-50 text-green-700 text-[9px] font-bold rounded-md uppercase">Arrangement</span>`} ${plant.bark && renderTemplate`<span class="px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-bold rounded-md uppercase">Bark</span>`} ${plant.fruit && renderTemplate`<span class="px-2 py-0.5 bg-red-50 text-red-700 text-[9px] font-bold rounded-md uppercase">Fruit</span>`} </div> </td> <td class="px-6 py-4 text-right"> <form method="POST" onsubmit="return confirm('Delete this plant?')"> <input type="hidden" name="action" value="delete-plant"> <input type="hidden" name="id"${addAttribute(plant.id, "value")}> <button type="submit" class="text-stone-300 hover:text-red-500 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg> </button> </form> </td> </tr>`)} </tbody> </table> ${plants.length === 0 && renderTemplate`<div class="p-20 text-center text-stone-400 italic">This group is empty.</div>`} </div> </div> </div> </div> </main> ` })}`;
}, "/Users/sam/projects/WoodyIDApp/src/pages/admin/group/[groupId].astro", void 0);

const $$file = "/Users/sam/projects/WoodyIDApp/src/pages/admin/group/[groupId].astro";
const $$url = "/admin/group/[groupId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$groupId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
