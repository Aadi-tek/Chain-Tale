import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export function GradientBackdrop({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-ct-background-light">
      <motion.div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(27,44,193,0.35),_rgba(248,249,252,0)),radial-gradient(circle_at_bottom_right,_rgba(255,107,107,0.35),_rgba(248,249,252,0))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      {children}
    </div>
  );
}

