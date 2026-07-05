import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { Conversation } from "@/types/chat";
import { AiraAvatar } from "./AiraAvatar";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  isOpen,
}: ChatSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="flex flex-col h-full glass-strong border-r border-glass-border/30 w-64 shrink-0"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {/* Brand */}
          <div className="p-4 flex items-center gap-3 border-b border-glass-border/20">
            <AiraAvatar size="sm" />
            <div>
              <h2 className="font-display font-semibold text-sm gradient-text">AIRA</h2>
              <p className="text-[10px] text-muted-foreground">AI Assistant</p>
            </div>
          </div>

          {/* New chat */}
          <div className="p-3">
            <motion.button
              onClick={onNew}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl glass hover:neon-glow-blue text-foreground text-sm font-medium transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="h-4 w-4 text-neon-blue" />
              New chat
            </motion.button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                className={cn(
                  "group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-all",
                  activeId === conv.id
                    ? "glass neon-glow-blue text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                )}
                onClick={() => onSelect(conv.id)}
                whileHover={{ x: 2 }}
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-60" />
                <span className="truncate flex-1">{conv.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-glass-border/20">
            <p className="text-[10px] text-muted-foreground text-center">
              
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
