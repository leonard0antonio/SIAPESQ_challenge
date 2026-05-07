import { motion, AnimatePresence } from "framer-motion";

interface Props {
  message: string;
}

export function ToastNotification({ message }: Props) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-3.5 rounded-full shadow-2xl shadow-emerald-900/20 flex items-center gap-3 font-medium text-sm border border-gray-800"
        >
          {/* Ícone SVG em vez do emoji */}
          <div className="flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full text-white">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}