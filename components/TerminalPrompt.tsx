interface TerminalPromptProps {
  command: string;
  showCursor?: boolean;
}

export function TerminalPrompt({ command, showCursor = false }: TerminalPromptProps) {
  return (
    <div className="flex items-center gap-0 mb-2 mt-6 first:mt-0">
      <span className="text-terminal-green">nullopcode</span>
      <span className="text-terminal-dim">@</span>
      <span className="text-terminal-blue">solana</span>
      <span className="text-terminal-dim">:</span>
      <span className="text-terminal-purple">~</span>
      <span className="text-terminal-dim">$ </span>
      <span className="text-terminal-amber">{command}</span>
      {showCursor && <span className="animate-blink ml-0.5 text-terminal-amber">_</span>}
    </div>
  );
}
