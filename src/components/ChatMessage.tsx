import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Message } from "@/types/chat";
import { AiraAvatar } from "./AiraAvatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={cn("py-5 px-4 md:px-0")}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="max-w-3xl mx-auto flex gap-3.5">
        {isUser ? (
          <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 glass neon-glow-blue"
            style={{ border: "1px solid hsl(210 100% 60% / 0.3)" }}
          >
            <User className="h-4 w-4 text-neon-blue" />
          </div>
        ) : (
          <AiraAvatar size="sm" isThinking={isStreaming} />
        )}

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium mb-1.5" style={{ color: isUser ? "hsl(var(--neon-blue))" : "hsl(var(--neon-purple))" }}>
            {isUser ? "You" : "AIRA"}
          </p>
          {isUser ? (
            <p className="text-foreground leading-relaxed">{message.content}</p>
          ) : (
            <div className={cn("prose-chat", isStreaming && "typing-cursor")}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
