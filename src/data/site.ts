export const site = {
  name: 'Diwali Crackers 2026',
  tagline: 'Premium & Standard Fireworks',
  season: 'Deepavali 2026',
  phonePrimary: '9701233737',
  phoneSecondary: '9666001229',
  whatsappNumber: '919701233737',
  whatsappDisplay: '+91 97012 33737',
  diwaliDate: '2026-11-08T18:00:00+05:30',
  address: 'Shop address to be updated',
  licence: 'Licence No. to be updated',
  deliveryNote: 'Home delivery available within city limits. Bulk orders welcome.',
  safetyNote:
    'Crackers are for outdoor use only. Keep away from children unsupervised, store in a cool dry place and follow local safety rules.',
};

export const telHref = (phone: string) => `tel:+91${phone}`;

export const waHref = (message?: string) =>
  `https://wa.me/${site.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
