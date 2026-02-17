import { motion, AnimatePresence } from "framer-motion";
import { AiraAvatar } from "./AiraAvatar";

interface ThinkingIndicatorProps {
  visible: boolean;
}

const thinkingPhrases = [
  "AIRA is thinking deeply...",
  "Analyzing your request...",
  "Crafting a thoughtful response...",
];

export function ThinkingIndicator({ visible }: ThinkingIndicatorProps) {
  const phrase = thinkingPhrases[Math.floor(Date.now() / 3000) % thinkingPhrases.length];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="py-5 px-4 md:px-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-3xl mx-auto flex gap-3.5 items-center">
            <AiraAvatar size="sm" isThinking />
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--neon-purple))" }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground italic">{phrase}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
