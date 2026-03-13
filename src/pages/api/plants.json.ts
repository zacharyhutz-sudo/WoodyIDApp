import { db, Groups, Plants, eq } from 'astro:db';

export async function GET({ params, request }) {
  const plants = await db.select().from(Plants);
  return new Response(JSON.stringify(plants), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
