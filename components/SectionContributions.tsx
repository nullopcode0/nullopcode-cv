import type { Contribution } from '@/lib/types';

export function SectionContributions({ contributions }: { contributions: Contribution[] }) {
  if (contributions.length === 0) {
    return <p className="text-terminal-dim mb-2">No contributions yet.</p>;
  }

  return (
    <div className="mb-2">
      {contributions.map((c) => {
        // Generate a fake short hash from the id
        const hash = c.id.slice(0, 7).padEnd(7, '0');
        const typeTag = c.contribution_type.toUpperCase();
        const mergedIndicator = c.merged ? '\u2713' : '\u2717';

        return (
          <div key={c.id} className="flex gap-2 mb-1 items-start">
            <span className="text-terminal-amber-dim shrink-0">{hash}</span>
            <span className={`shrink-0 ${c.merged ? 'text-terminal-green' : 'text-terminal-dim'}`}>
              {mergedIndicator}
            </span>
            <span className="text-terminal-purple shrink-0">[{typeTag}]</span>
            <span className="text-terminal-text">
              <a
                href={c.pr_url || c.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-blue hover:underline"
              >
                {c.repo_name}
              </a>
              {' -- '}
              {c.description}
            </span>
          </div>
        );
      })}
    </div>
  );
}
