import type { APIRoute } from 'astro';

export const prerender = false;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), { status: 415 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { nome, email, telefono, messaggio } = body;

  if (!nome || !email || !messaggio) {
    return new Response(JSON.stringify({ error: 'Campi mancanti: nome, email, messaggio sono obbligatori.' }), { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'Email non valida.' }), { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY non configurata');
    return new Response(JSON.stringify({ error: 'Configurazione server mancante.' }), { status: 500 });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'noreply@ncctaxisiracusa.com',
      to: 'info@ncctaxisiracusa.com',
      reply_to: email,
      subject: `Nuova richiesta da ${escapeHtml(nome)}`,
      html: `
        <h2 style="font-family: sans-serif; color: #0b1928;">Nuova richiesta dal sito Sicily Driver</h2>
        <table style="font-family: sans-serif; font-size: 15px; border-collapse: collapse;">
          <tr><td style="padding: 6px 16px 6px 0; font-weight: bold; color: #364a63;">Nome:</td><td>${escapeHtml(nome)}</td></tr>
          <tr><td style="padding: 6px 16px 6px 0; font-weight: bold; color: #364a63;">Email:</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 6px 16px 6px 0; font-weight: bold; color: #364a63;">Telefono:</td><td>${escapeHtml(telefono || 'non fornito')}</td></tr>
        </table>
        <h3 style="font-family: sans-serif; color: #364a63; margin-top: 20px;">Messaggio:</h3>
        <p style="font-family: sans-serif; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(messaggio)}</p>
        <hr style="border: none; border-top: 1px solid #e6d3b3; margin: 24px 0;" />
        <p style="font-family: sans-serif; font-size: 12px; color: #9cb0c9;">Inviato da ncctaxisiracusa.com</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('Resend error:', err);
    return new Response(JSON.stringify({ error: 'Errore nell\'invio email.' }), { status: 500 });
  }
};

export const GET: APIRoute = () => {
  return new Response('Method not allowed', { status: 405 });
};
