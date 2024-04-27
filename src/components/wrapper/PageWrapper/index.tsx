"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function PageWrapper({
  children,
  marginTop,
}: {
  children: React.ReactNode;
  marginTop?: number;
}) {
  const top = marginTop ? `mt-${marginTop}` : "mt-16";
  return (
    <div className={`px-5 sm:px-16 ${top}`}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.25 }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
