import ReactMarkdown from "react-markdown";
import { User, Bot } from "lucide-react";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("py-6 px-4 md:px-0", isUser ? "bg-transparent" : "bg-transparent")}>
      <div className="max-w-3xl mx-auto flex gap-4">
        <div
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
            isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground mb-1.5">
            {isUser ? "You" : "Assistant"}
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
    </div>
  );
}
