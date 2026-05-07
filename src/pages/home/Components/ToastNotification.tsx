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
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm"
        >
          <span className="text-green-400">✔</span> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}