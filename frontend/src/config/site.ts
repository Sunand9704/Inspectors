export const SITE_PHONE_DISPLAY = '+44 7934 980214';

export function getWhatsappNumber(): string {
  // Remove any non-digit characters for wa.me format
  return SITE_PHONE_DISPLAY.replace(/[^\d]/g, '');
}

export function getWhatsappLink(message?: string): string {
  const num = getWhatsappNumber();
  const base = `https://wa.me/${num}`;
  if (message && message.trim().length > 0) {
    const text = encodeURIComponent(message.trim());
    return `${base}?text=${text}`;
  }
  return base;
}


