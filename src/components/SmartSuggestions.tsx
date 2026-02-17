import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SmartSuggestionsProps {
  suggestions: string[];
  visible: boolean;
  onSelect: (text: string) => void;
}

export function SmartSuggestions({ suggestions, visible, onSelect }: SmartSuggestionsProps) {
  return (
    <AnimatePresence>
      {visible && suggestions.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 px-1 pb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {suggestions.map((s, i) => (
            <motion.button
              key={s}
              onClick={() => onSelect(s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs glass hover:neon-glow-blue transition-all"
              style={{ color: "hsl(var(--foreground))" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.25 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-3 w-3 text-neon-purple" />
              {s}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
