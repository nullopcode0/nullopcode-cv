import Image from 'next/image';
import type { Profile } from '@/lib/types';
import { ExportButton } from './ExportButton';

interface LinkItem {
  label: string;
  url: string;
}

export function ProfileHeader({ profile }: { profile: Profile }) {
  const links: LinkItem[] = [];
  if (profile.github_url) links.push({ label: 'GitHub', url: profile.github_url });
  if (profile.x_url) links.push({ label: 'X', url: profile.x_url });
  if (profile.farcaster_url) links.push({ label: 'Farcaster', url: profile.farcaster_url });
  if (profile.bluesky_url) links.push({ label: 'Bluesky', url: profile.bluesky_url });
  if (profile.lens_url) links.push({ label: 'Lens', url: profile.lens_url });
  if (profile.reddit_url) links.push({ label: 'Reddit', url: profile.reddit_url });
  if (profile.paragraph_url) links.push({ label: 'Paragraph', url: profile.paragraph_url });

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <Image
        src="/chad.png"
        alt={profile.name}
        width={120}
        height={120}
        className="rounded-full border-2 border-terminal-border shrink-0"
        priority
      />
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold">
          <a
            href="https://www.sns.id/account/GzUzzfuv9fWd4sstFHf9BP3KQFTbh4RW3YcpbRAzZ79a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-amber-bright hover:text-terminal-amber hover:underline"
          >
            nullopcode.sol
          </a>
        </h1>
        <p className="text-terminal-dim text-sm">@{profile.handle}</p>
        <p className="text-terminal-amber mt-1">{profile.title}</p>
        <p className="text-terminal-text mt-3 leading-relaxed max-w-xl">{profile.bio}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-blue hover:text-terminal-amber-bright hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        {profile.solana_address && (
          <p className="text-terminal-dim mt-2 text-xs font-mono">
            SOL: {profile.solana_address}
          </p>
        )}

        <div className="mt-4 no-print">
          <ExportButton />
        </div>
      </div>
    </div>
  );
}
