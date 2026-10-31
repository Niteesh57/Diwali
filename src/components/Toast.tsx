import { AnimatePresence, motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { useToast } from '../lib/toast';

export function Toast() {
  const message = useToast((state) => state.message);
  const tone = useToast((state) => state.tone);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[96] flex justify-center px-4 md:bottom-8">
      <AnimatePresence>
        {message && (
          <motion.div
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold/30 bg-[#1a0d2e]/95 px-4 py-2.5 text-sm text-cream shadow-2xl backdrop-blur"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-gold">
              {tone === 'success' ? <Check size={14} /> : <Info size={14} />}
            </span>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
