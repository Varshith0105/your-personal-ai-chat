import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ThinkingIndicator } from "@/components/ThinkingIndicator";
import { MoodIndicator } from "@/components/MoodIndicator";
import { useChat } from "@/hooks/use-chat";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    deleteConversation,
    sendMessage,
    isLoading,
    error,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mood, setMood] = useState("friendly");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  useEffect(() => {
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    }
  }, [error, toast]);

  const handleSend = (input: string) => {
    sendMessage(input);
  };

  const messages = activeConversation?.messages || [];
  const lastMsg = messages[messages.length - 1];
  const isStreamingLast = isLoading && lastMsg?.role === "assistant";
  const showThinking = isLoading && (!lastMsg || lastMsg.role === "user");

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      <ParticleBackground />

      <ChatSidebar
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={setActiveConversationId}
        onNew={createConversation}
        onDelete={deleteConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between gap-2 px-4 h-14 border-b border-glass-border/20 glass-strong shrink-0">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeft className="h-5 w-5" />
              )}
            </motion.button>
            <span className="text-sm font-medium text-foreground truncate">
              {activeConversation?.title || "New chat"}
            </span>
          </div>

          <MoodIndicator activeMood={mood} onMoodChange={setMood} />
        </header>

        {/* Messages area */}
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestion={handleSend} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg, i) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={isStreamingLast && i === messages.length - 1}
              />
            ))}
            <ThinkingIndicator visible={showThinking} />
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input */}
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
