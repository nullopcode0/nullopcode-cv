import type { Project } from '@/lib/types';

const statusColors: Record<string, string> = {
  active: 'text-terminal-green',
  shipped: 'text-terminal-amber',
  building: 'text-terminal-blue',
  archived: 'text-terminal-dim',
};

export function SectionProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="mb-2 overflow-x-auto">
      {/* Header */}
      <div className="flex gap-2 text-terminal-amber-dim text-xs mb-2">
        <span className="w-44 shrink-0">NAME</span>
        <span className="w-16 shrink-0">CHAIN</span>
        <span className="w-20 shrink-0">STATUS</span>
        <span className="flex-1">DESCRIPTION</span>
      </div>
      <div className="border-t border-terminal-border mb-2" />
      {/* Rows */}
      {projects.map((p) => (
        <div key={p.id} className="flex gap-2 mb-1.5 items-start">
          <span className="w-44 shrink-0 text-terminal-amber-bright truncate">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {p.name}
              </a>
            ) : (
              p.name
            )}
          </span>
          <span className="w-16 shrink-0 text-terminal-dim">{p.chain || '--'}</span>
          <span className={`w-20 shrink-0 ${statusColors[p.status] || 'text-terminal-dim'}`}>
            {p.status}
          </span>
          <span className="flex-1 text-terminal-text">{p.description}</span>
        </div>
      ))}
      {projects.some(p => p.program_id) && (
        <div className="mt-3 text-terminal-dim text-xs">
          {projects.filter(p => p.program_id).map(p => (
            <p key={p.id}>// {p.name}: {p.program_id}</p>
          ))}
        </div>
      )}
    </div>
  );
}
