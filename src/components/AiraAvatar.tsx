import { motion } from "framer-motion";

interface AiraAvatarProps {
  size?: "sm" | "md" | "lg";
  isThinking?: boolean;
}

export function AiraAvatar({ size = "md", isThinking = false }: AiraAvatarProps) {
  const sizeMap = { sm: 32, md: 40, lg: 72 };
  const px = sizeMap[size];

  return (
    <div className="relative shrink-0" style={{ width: px, height: px }}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, hsl(210 100% 60%), hsl(270 80% 60%), hsl(185 100% 55%), hsl(210 100% 60%))",
          padding: 2,
        }}
        animate={{ rotate: isThinking ? 360 : 0 }}
        transition={{ duration: isThinking ? 2 : 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full bg-background" />
      </motion.div>

      {/* Inner avatar */}
      <div
        className="absolute inset-[3px] rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(230 25% 12%), hsl(230 25% 8%))",
        }}
      >
        <motion.span
          className="font-display font-bold gradient-text select-none"
          style={{ fontSize: px * 0.35 }}
          animate={isThinking ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          AI
        </motion.span>
      </div>

      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full glow-ring pointer-events-none"
        style={{ opacity: isThinking ? 0.8 : 0.4 }}
      />
    </div>
  );
}
