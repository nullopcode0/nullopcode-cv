export function SectionSkills({ skills }: { skills: string[] }) {
  // Group skills by category
  const languages = skills.filter(s =>
    ['Rust', 'TypeScript', 'JavaScript', 'Python', 'SQL'].includes(s)
  );
  const blockchain = skills.filter(s =>
    ['Anchor', 'Solana', 'Solana Web3.js', 'Wagmi', 'Viem', 'AT Protocol'].includes(s)
  );
  const infra = skills.filter(s =>
    ['Cloudflare Workers', 'Next.js', 'Supabase', 'Vercel', 'Docker'].includes(s)
  );

  // Anything not categorized
  const categorized = new Set([...languages, ...blockchain, ...infra]);
  const other = skills.filter(s => !categorized.has(s));

  return (
    <div className="mb-2">
      <span className="text-terminal-dim">{'{'}</span>
      <SkillLine label="languages" items={languages} />
      <SkillLine label="blockchain" items={blockchain} />
      <SkillLine label="infrastructure" items={infra} />
      {other.length > 0 && <SkillLine label="other" items={other} />}
      <span className="text-terminal-dim">{'}'}</span>
    </div>
  );
}

function SkillLine({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="ml-4">
      <span className="text-terminal-amber">&quot;{label}&quot;</span>
      <span className="text-terminal-dim">: [</span>
      {items.map((item, i) => (
        <span key={item}>
          <span className="text-terminal-green">&quot;{item}&quot;</span>
          {i < items.length - 1 && <span className="text-terminal-dim">, </span>}
        </span>
      ))}
      <span className="text-terminal-dim">],</span>
    </div>
  );
}
