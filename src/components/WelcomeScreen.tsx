import { motion } from "framer-motion";
import { Sparkles, Code, Mail, BookOpen } from "lucide-react";
import { AiraAvatar } from "./AiraAvatar";

interface WelcomeScreenProps {
  onSuggestion: (text: string) => void;
}

const suggestions = [
  { text: "Explain quantum computing in simple terms", icon: BookOpen },
  { text: "Write a Python script to sort a list", icon: Code },
  { text: "Help me write a professional email", icon: Mail },
  { text: "What are the best practices for React?", icon: Sparkles },
];

export function WelcomeScreen({ onSuggestion }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <AiraAvatar size="lg" />
      </motion.div>

      <motion.h1
        className="text-3xl md:text-4xl font-display font-bold gradient-text mb-3 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Hey, I'm AIRA
      </motion.h1>

      <motion.p
        className="text-muted-foreground text-sm mb-1 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Your intelligent companion — ready to think, create, and explore with you.
      </motion.p>
      <motion.p
        className="text-muted-foreground/60 text-xs mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        I remember our conversations and adapt to your style ✨
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
        {suggestions.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={s.text}
              onClick={() => onSuggestion(s.text)}
              className="group text-left px-4 py-3.5 rounded-xl glass hover:neon-glow-blue transition-all text-sm text-foreground flex items-start gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.35 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-1.5 rounded-lg mt-0.5" style={{ background: "hsl(var(--neon-purple) / 0.15)" }}>
                <Icon className="h-4 w-4 text-neon-purple" />
              </div>
              <span className="leading-snug">{s.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
