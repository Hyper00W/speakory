// WhatsApp Integration Configuration for Speakory
export const WHATSAPP_CONFIG = {
  // Official WhatsApp Phone Number
  phoneNumber: '918847693947',
  displayPhoneNumber: '+91 88476 93947',
  // Pre-drafted message crafted specifically from a parent's perspective
  defaultMessage:
    'Hi Speakory team, I am exploring your communication & public speaking program for my child. Could we please connect on a quick call to discuss the curriculum and batch details?',
};

/**
 * Builds the WhatsApp direct chat link with prefilled message
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage || WHATSAPP_CONFIG.defaultMessage);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${text}`;
}

