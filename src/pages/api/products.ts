import type { APIRoute } from 'astro';
import { db } from '../../lib/database';

export const GET: APIRoute = async ({ url }) => {
  try {
    const categoryId = url.searchParams.get('category');
    const featured = url.searchParams.get('featured');

    let result;
    if (featured === 'true') {
      result = await db.getFeaturedProducts();
    } else {
      result = await db.getProducts(categoryId ? parseInt(categoryId) : undefined);
    }

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(result.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};