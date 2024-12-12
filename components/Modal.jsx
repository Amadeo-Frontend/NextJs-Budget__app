"use client";

import { motion, AnimatePresence } from "framer-motion";

function Modal({ show, onClose, children }) {
  return (
    <AnimatePresence>
      {show && (
        // Overlay do modal, com fade-in/fade-out
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.2 }}
        >
          {/* Conteúdo do modal com animação de entrada e saída */}
          <motion.div
            className="relative container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-background py-6 px-2 md:px-4 shadow-lg"
            initial={{ x: -200, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -200, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <button
              onClick={() => onClose(false)}
              className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600 hover:bg-slate-500 absolute top-4 right-4 focus:outline-none"
            >
              X
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
