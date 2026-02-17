import { useState, useCallback, useRef } from "react";
import { Message, Conversation } from "@/types/chat";
import { streamChat } from "@/lib/chat-stream";

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const assistantBuffer = useRef("");

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  const createConversation = useCallback(() => {
    const id = crypto.randomUUID();
    const conv: Conversation = {
      id,
      title: "New chat",
      messages: [],
      createdAt: new Date(),
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveConversationId(id);
    return id;
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
    },
    [activeConversationId]
  );

  const updateMessages = useCallback(
    (convId: string, updater: (msgs: Message[]) => Message[]) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: updater(c.messages) } : c))
      );
    },
    []
  );

  const updateTitle = useCallback((convId: string, firstMessage: string) => {
    const title = firstMessage.length > 40 ? firstMessage.slice(0, 40) + "…" : firstMessage;
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, title } : c))
    );
  }, []);

  const sendMessage = useCallback(
    async (input: string) => {
      setError(null);
      let convId = activeConversationId;

      if (!convId) {
        convId = createConversation();
      }

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: input,
      };

      // Get current messages before adding new one
      const currentConv = conversations.find((c) => c.id === convId);
      const currentMessages = currentConv?.messages || [];

      if (currentMessages.length === 0) {
        updateTitle(convId, input);
      }

      updateMessages(convId, (msgs) => [...msgs, userMsg]);
      setIsLoading(true);

      assistantBuffer.current = "";
      const assistantId = crypto.randomUUID();

      const messagesForApi = [...currentMessages, userMsg].map(({ role, content }) => ({
        role,
        content,
      }));

      try {
        await streamChat({
          messages: messagesForApi,
          onDelta: (chunk) => {
            assistantBuffer.current += chunk;
            const content = assistantBuffer.current;
            updateMessages(convId!, (msgs) => {
              const last = msgs[msgs.length - 1];
              if (last?.role === "assistant" && last.id === assistantId) {
                return msgs.map((m) => (m.id === assistantId ? { ...m, content } : m));
              }
              return [...msgs, { id: assistantId, role: "assistant", content }];
            });
          },
          onDone: () => setIsLoading(false),
          onError: (err) => {
            setError(err);
            setIsLoading(false);
          },
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
        setIsLoading(false);
      }
    },
    [activeConversationId, conversations, createConversation, updateMessages, updateTitle]
  );

  return {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    deleteConversation,
    sendMessage,
    isLoading,
    error,
  };
}
