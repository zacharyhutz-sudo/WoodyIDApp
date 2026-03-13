import { asDrizzleTable, normalizeDatabaseUrl } from '@astrojs/db/runtime';
import { createClient } from '@astrojs/db/db-client/libsql-local.js';
import '@astrojs/db/dist/runtime/virtual.js';

const dbUrl = normalizeDatabaseUrl("local.db", "file:///Users/sam/projects/WoodyIDApp/.astro/content.db");
const db = createClient({ url: dbUrl });

asDrizzleTable("Groups", {"columns":{"id":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Groups","primaryKey":true}},"name":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"name","collection":"Groups","primaryKey":false,"optional":false}}},"deprecated":false,"indexes":{}}, false);
const Plants = asDrizzleTable("Plants", {"columns":{"id":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Plants","primaryKey":true}},"groupId":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"groupId","collection":"Plants","primaryKey":false,"optional":false,"references":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"id","collection":"Groups","primaryKey":true}}}},"scientificName":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"scientificName","collection":"Plants","primaryKey":false,"optional":false}},"family":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"family","collection":"Plants","primaryKey":false,"optional":true}},"commonName":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"commonName","collection":"Plants","primaryKey":false,"optional":false}},"imageUrl":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"imageUrl","collection":"Plants","primaryKey":false,"optional":true}},"latitude":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"latitude","collection":"Plants","primaryKey":false,"optional":true}},"longitude":{"type":"number","schema":{"unique":false,"deprecated":false,"name":"longitude","collection":"Plants","primaryKey":false,"optional":true}},"leafArrangement":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"leafArrangement","collection":"Plants","primaryKey":false,"optional":true}},"leafMargin":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"leafMargin","collection":"Plants","primaryKey":false,"optional":true}},"leafShape":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"leafShape","collection":"Plants","primaryKey":false,"optional":true}},"leafBase":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"leafBase","collection":"Plants","primaryKey":false,"optional":true}},"leafApex":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"leafApex","collection":"Plants","primaryKey":false,"optional":true}},"bark":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"bark","collection":"Plants","primaryKey":false,"optional":true}},"flower":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"flower","collection":"Plants","primaryKey":false,"optional":true}},"fruit":{"type":"text","schema":{"unique":false,"deprecated":false,"name":"fruit","collection":"Plants","primaryKey":false,"optional":true}}},"deprecated":false,"indexes":{}}, false);

async function GET({ params, request }) {
  const plants = await db.select().from(Plants);
  return new Response(JSON.stringify(plants), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
