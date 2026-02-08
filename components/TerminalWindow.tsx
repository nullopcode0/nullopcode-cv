interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
}

export function TerminalWindow({ title = 'nullopcode@solana:~', children }: TerminalWindowProps) {
  return (
    <div className="terminal-window relative bg-terminal-bg border border-terminal-border rounded-lg shadow-2xl overflow-hidden max-w-4xl mx-auto terminal-glow terminal-scanlines">
      {/* Title bar */}
      <div className="terminal-window-chrome flex items-center gap-2 px-4 py-3 bg-terminal-chrome border-b border-terminal-border">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="flex-1 text-center text-xs text-terminal-dim">{title}</span>
      </div>
      {/* Content */}
      <div className="p-6 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
