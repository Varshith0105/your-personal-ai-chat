import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Paperclip } from "lucide-react";
import { SmartSuggestions } from "./SmartSuggestions";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const quickSuggestions = [
  "Summarize this topic",
  "Explain like I'm 5",
  "Give me a code example",
  "What are the pros and cons?",
];

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pauseTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleInputChange = useCallback((val: string) => {
    setInput(val);
    setShowSuggestions(false);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    if (val.trim().length > 0) {
      pauseTimer.current = setTimeout(() => setShowSuggestions(true), 1500);
    }
  }, []);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
    setShowSuggestions(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 pb-5 pt-2">
      <SmartSuggestions
        suggestions={quickSuggestions}
        visible={showSuggestions && !isLoading}
        onSelect={(s) => {
          onSend(s);
          setShowSuggestions(false);
        }}
      />

      <div className="relative glass rounded-2xl neon-glow-blue transition-all focus-within:neon-glow-purple">
        <div className="flex items-end">
          {/* Attachment */}
          <motion.button
            className="p-2.5 ml-1.5 text-muted-foreground hover:text-neon-cyan transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </motion.button>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Talk to AIRA..."
            rows={1}
            className="flex-1 bg-transparent resize-none px-2 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none text-sm max-h-[200px]"
          />

          {/* Mic */}
          <motion.button
            className="p-2.5 text-muted-foreground hover:text-neon-purple transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Voice input"
          >
            <Mic className="h-4 w-4" />
          </motion.button>

          {/* Send */}
          <motion.button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="p-2 m-1.5 rounded-xl disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            style={{
              background: input.trim() ? "linear-gradient(135deg, hsl(210 100% 60%), hsl(270 80% 60%))" : "hsl(var(--muted))",
              color: input.trim() ? "white" : "hsl(var(--muted-foreground))",
            }}
            whileHover={input.trim() ? { scale: 1.05 } : {}}
            whileTap={input.trim() ? { scale: 0.95 } : {}}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground mt-2.5 opacity-60">
        AIRA can make mistakes. Always verify important information.
      </p>
    </div>
  );
}
