interface TerminalWindowProps {
  children: React.ReactNode;
}

export function TerminalWindow({ children }: TerminalWindowProps) {
  return (
    <div className="terminal-window relative bg-terminal-chrome/50 border border-terminal-border rounded-lg overflow-hidden terminal-scanlines">
      <div className="p-6 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
