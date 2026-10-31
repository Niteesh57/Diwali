import { create } from 'zustand';

type ToastState = {
  message: string | null;
  tone: 'success' | 'info';
  show: (message: string, tone?: 'success' | 'info') => void;
  hide: () => void;
};

let timer: ReturnType<typeof setTimeout> | undefined;

export const useToast = create<ToastState>((set) => ({
  message: null,
  tone: 'info',
  show: (message, tone = 'success') => {
    if (timer) clearTimeout(timer);
    set({ message, tone });
    timer = setTimeout(() => set({ message: null }), 2600);
  },
  hide: () => {
    if (timer) clearTimeout(timer);
    set({ message: null });
  },
}));
