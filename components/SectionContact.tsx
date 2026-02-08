import type { Profile } from '@/lib/types';
import { ExportButton } from './ExportButton';

interface LinkItem {
  label: string;
  url: string;
}

export function SectionContact({ profile }: { profile: Profile }) {
  const links: LinkItem[] = [];

  if (profile.x_url) links.push({ label: 'X', url: profile.x_url });
  if (profile.farcaster_url) links.push({ label: 'Farcaster', url: profile.farcaster_url });
  if (profile.bluesky_url) links.push({ label: 'Bluesky', url: profile.bluesky_url });
  if (profile.lens_url) links.push({ label: 'Lens', url: profile.lens_url });
  if (profile.github_url) links.push({ label: 'GitHub', url: profile.github_url });

  return (
    <div className="mb-2">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {links.map((link) => (
          <span key={link.label}>
            <span className="text-terminal-amber">{link.label}</span>
            <span className="text-terminal-dim">: </span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-blue hover:underline"
            >
              @{profile.handle}
            </a>
          </span>
        ))}
      </div>
      {profile.email && (
        <p className="mt-2">
          <span className="text-terminal-amber">Email</span>
          <span className="text-terminal-dim">: </span>
          <a href={`mailto:${profile.email}`} className="text-terminal-blue hover:underline">
            {profile.email}
          </a>
        </p>
      )}
      <div className="mt-4 no-print">
        <ExportButton />
      </div>
    </div>
  );
}
