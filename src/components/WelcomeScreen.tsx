import { Bot } from "lucide-react";

interface WelcomeScreenProps {
  onSuggestion: (text: string) => void;
}

const suggestions = [
  "Explain quantum computing in simple terms",
  "Write a Python script to sort a list",
  "What are the best practices for React?",
  "Help me write a professional email",
];

export function WelcomeScreen({ onSuggestion }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Bot className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-2xl font-semibold text-foreground mb-2">How can I help you today?</h1>
      <p className="text-muted-foreground text-sm mb-8">Start a conversation or try one of these suggestions</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="text-left px-4 py-3 rounded-xl border border-border bg-secondary/50 hover:bg-secondary text-sm text-foreground transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
