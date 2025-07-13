import type { APIRoute } from 'astro';
import { db } from '../../../lib/database';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await db.authenticateUser(email, password);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Set HTTP-only cookie with JWT token
    const response = new Response(JSON.stringify({ 
      user: result.user,
      message: 'Login successful' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    response.headers.set('Set-Cookie', `auth-token=${result.token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`);

    return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};