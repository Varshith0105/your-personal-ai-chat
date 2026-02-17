import { motion, AnimatePresence } from "framer-motion";
import { Brain, Heart, Target } from "lucide-react";

const moods = [
  { key: "friendly", label: "Friendly", icon: Heart, color: "hsl(210, 100%, 60%)" },
  { key: "analytical", label: "Analytical", icon: Brain, color: "hsl(270, 80%, 60%)" },
  { key: "supportive", label: "Supportive", icon: Target, color: "hsl(185, 100%, 55%)" },
] as const;

interface MoodIndicatorProps {
  activeMood: string;
  onMoodChange: (mood: string) => void;
}

export function MoodIndicator({ activeMood, onMoodChange }: MoodIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isActive = activeMood === mood.key;
        return (
          <motion.button
            key={mood.key}
            onClick={() => onMoodChange(mood.key)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              background: isActive ? `${mood.color}20` : "transparent",
              color: isActive ? mood.color : "hsl(220, 15%, 50%)",
              border: `1px solid ${isActive ? `${mood.color}40` : "transparent"}`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="h-3 w-3" />
            <span>{mood.label}</span>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: `0 0 12px ${mood.color}30` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
