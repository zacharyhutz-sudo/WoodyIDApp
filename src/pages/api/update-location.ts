import { db, Groups, Plants, eq } from 'astro:db';

export async function POST({ request, cookies }) {
  const auth = cookies.get('auth')?.value;
  if (auth !== 'ugawoodies') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'update-location') {
    const id = formData.get('id') as string;
    const lat = parseFloat(formData.get('lat') as string);
    const lng = parseFloat(formData.get('lng') as string);
    
    await db.update(Plants)
      .set({ latitude: lat, longitude: lng })
      .where(eq(Plants.id, id));
      
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
}
