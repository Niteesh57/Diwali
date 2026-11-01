import { MessageCircle } from 'lucide-react';
import { waHref } from '../data/site';

export function WhatsAppFab() {
  return (
    <a
      href={waHref('Hi, I would like to order Diwali crackers from the 2026 price list.')}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-4 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25d366] text-[#07230f] shadow-[0_14px_34px_-10px_rgba(37,211,102,0.8)] transition hover:scale-105 md:grid"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}
