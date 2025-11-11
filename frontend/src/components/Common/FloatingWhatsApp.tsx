import { getWhatsappLink } from '@/config/site';

export default function FloatingWhatsApp() {
  const href = getWhatsappLink('Hello! I would like to know more about your services.');

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-50 bottom-5 right-5 inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-black/20 transition-colors"
    >
      <img
        src="https://cdn.simpleicons.org/whatsapp/FFFFFF"
        alt="WhatsApp"
        className="w-7 h-7"
        draggable={false}
      />
    </a>
  );
}


