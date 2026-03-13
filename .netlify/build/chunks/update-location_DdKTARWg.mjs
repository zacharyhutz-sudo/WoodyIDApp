import { d as db, P as Plants } from './_astro_db_seed_DaYMXNRe.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

async function POST({ request, cookies }) {
  const auth = cookies.get("auth")?.value;
  if (auth !== "ugawoodies") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const formData = await request.formData();
  const action = formData.get("action");
  if (action === "update-location") {
    const id = formData.get("id");
    const lat = parseFloat(formData.get("lat"));
    const lng = parseFloat(formData.get("lng"));
    await db.update(Plants).set({ latitude: lat, longitude: lng }).where(eq(Plants.id, id));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
