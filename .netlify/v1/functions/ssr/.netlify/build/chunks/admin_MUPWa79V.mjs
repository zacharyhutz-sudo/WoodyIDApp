import { c as createComponent } from './astro-component_CDWWFvb5.mjs';
import 'piccolore';
import { g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from './ssr-function_DuAdq3-t.mjs';
import { $ as $$Layout } from './Layout_D1oIFwpG.mjs';
import { d as db, G as Groups } from './_astro_db_seed_DaYMXNRe.mjs';

const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Admin;
  const cookie = Astro2.request.headers.get("cookie");
  const isAuthenticated = cookie?.includes("auth=ugawoodies");
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const action = formData.get("action");
    if (action === "login") {
      const password = formData.get("password");
      if (password === "ugawoodies") {
        return new Response(null, {
          status: 302,
          headers: {
            "Set-Cookie": "auth=ugawoodies; Path=/; HttpOnly; Max-Age=86400",
            "Location": "/admin"
          }
        });
      }
    }
    if (isAuthenticated && action === "new-group") {
      const name = formData.get("name");
      const id = name.toLowerCase().replace(/\s+/g, "-");
      await db.insert(Groups).values({ id, name });
    }
  }
  const groups = isAuthenticated ? await db.select().from(Groups) : [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-stone-50 text-stone-900 font-sans p-4 md:p-12"> <div class="max-w-4xl mx-auto"> ${!isAuthenticated ? renderTemplate`<div class="max-w-md mx-auto mt-20 bg-white p-8 rounded-3xl shadow-xl border border-stone-200"> <h1 class="text-3xl font-bold mb-6 text-center">Admin Access</h1> <form method="POST" class="space-y-4"> <input type="hidden" name="action" value="login"> <div> <label for="password" class="block text-sm font-medium text-stone-700 mb-1">Password</label> <input type="password" name="password" id="password" class="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" placeholder="Enter password..."> </div> <button type="submit" class="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-200">
Login
</button> </form> </div>` : renderTemplate`<div class="space-y-8"> <header class="flex justify-between items-center"> <div> <h1 class="text-3xl font-bold">Admin Dashboard</h1> <p class="text-stone-500">Welcome back, Professor.</p> </div> <div class="flex gap-4"> <a href="/" class="text-sm font-medium text-stone-500 hover:text-stone-900 underline underline-offset-4 pt-2">View Site</a> <button onclick="document.cookie='auth=; Max-Age=0; Path=/;'; location.reload();" class="text-sm font-medium text-red-500 hover:text-red-700">Logout</button> </div> </header> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm"> <span class="text-green-600 font-bold text-sm uppercase tracking-wider">Editor</span> <h2 class="text-xl font-bold mt-1">Manage Lists</h2> <p class="text-stone-500 text-sm mt-2 mb-6">Create new groups or add plants to existing lists.</p> <form method="POST" class="flex gap-2"> <input type="hidden" name="action" value="new-group"> <input type="text" name="name" placeholder="Group Name (e.g. Group 11)" required class="flex-grow px-4 py-2 rounded-lg border border-stone-200 text-sm outline-none focus:ring-2 focus:ring-green-500"> <button type="submit" class="bg-stone-900 text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-stone-800 transition-all">
Create
</button> </form> </div> <a href="/admin/map" class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:border-blue-500 hover:shadow-md transition-all text-left group"> <span class="text-blue-600 font-bold text-sm uppercase tracking-wider">Mapping</span> <h2 class="text-xl font-bold mt-1 group-hover:text-blue-700">Map Editor</h2> <p class="text-stone-500 text-sm mt-2">Drag and drop pins onto the campus map to set plant locations.</p> </a> </div> <div class="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm"> <div class="p-6 border-b border-stone-100 bg-stone-50/50"> <h2 class="text-xl font-bold">Existing Groups</h2> </div> <div class="divide-y divide-stone-100"> ${groups.map((group) => renderTemplate`<div class="p-4 flex justify-between items-center hover:bg-stone-50 transition-colors"> <div> <span class="font-bold text-stone-800">${group.name}</span> <span class="ml-4 text-xs text-stone-400 uppercase tracking-tighter">ID: ${group.id}</span> </div> <a${addAttribute(`/admin/group/${group.id}`, "href")} class="text-xs font-bold text-green-600 hover:text-green-800 uppercase tracking-widest">
Edit Plants →
</a> </div>`)} ${groups.length === 0 && renderTemplate`<div class="p-8 text-center text-stone-400 italic">No groups found. Start by creating one above.</div>`} </div> </div> </div>`} </div> </main> ` })}`;
}, "/Users/sam/projects/WoodyIDApp/src/pages/admin.astro", void 0);

const $$file = "/Users/sam/projects/WoodyIDApp/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
