import type { Profile } from '@/lib/types';

export function SectionAbout({ profile }: { profile: Profile }) {
  return (
    <div className="mb-2">
      <p className="text-terminal-amber-bright text-lg font-bold">
        # {profile.name}
      </p>
      <p className="text-terminal-amber mt-1">{profile.title}</p>
      <p className="text-terminal-text mt-3 max-w-2xl leading-relaxed">{profile.bio}</p>
      {profile.solana_address && (
        <p className="text-terminal-dim mt-2 text-xs">
          SOL: {profile.solana_address}
        </p>
      )}
    </div>
  );
}
