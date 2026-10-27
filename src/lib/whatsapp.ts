import { studio } from "@/content/site";

/**
 * Builds a WhatsApp click-to-chat link. With no configured number, wa.me
 * opens WhatsApp with the message ready and lets the visitor pick the chat,
 * so links never break, but set NEXT_PUBLIC_WHATSAPP_NUMBER before launch.
 */
export function whatsappUrl(message = "Hello Smaranika Studio! I'd love to know more about your wedding photography and films.") {
  const text = encodeURIComponent(message);
  const number = studio.whatsappNumber.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}
