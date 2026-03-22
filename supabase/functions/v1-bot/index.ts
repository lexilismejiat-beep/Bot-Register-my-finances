import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const TELEGRAM_TOKEN = Deno.env.get("TELEGRAM_TOKEN");
const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_TOKEN");

serve(async (req) => {
  try {
    const payload = await req.json();

    // Respuesta rápida para Telegram
    if (payload.message) {
      const chatId = payload.message.chat.id;
      const text = payload.message.text;

      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: `¡Hola! Recibí tu mensaje: ${text}` }),
      });
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
})
