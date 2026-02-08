-- Run this in Supabase SQL Editor to clear and reseed

TRUNCATE profile, projects, contributions;

INSERT INTO profile (handle, name, title, bio, website, solana_address, github_url, x_url, farcaster_url, bluesky_url, lens_url, reddit_url, paragraph_url)
VALUES (
  'nullopcode',
  'nullopcode',
  'Solana Builder & Protocol Engineer',
  'Building on-chain programs, DeFi infrastructure, and open-source tooling. Focused on Solana — staking systems, liquidity protocols, and cross-platform automation.',
  'https://nullopcode.cv',
  'CGiuetrCxiaibJuxxCvrRjMyEjgmVEngxmvBXJtrmB5y',
  'https://github.com/nullopcode0',
  'https://x.com/nullopcode',
  'https://warpcast.com/nullopcode',
  'https://bsky.app/profile/nullopcode.bsky.social',
  'https://hey.xyz/u/nullopcode',
  'https://reddit.com/u/nullopcode',
  'https://paragraph.com/@nullopcode'
);

INSERT INTO projects (name, slug, description, tech_stack, category, status, program_id, chain, sort_order) VALUES
(
  'SPL Token Staking',
  'spl-token-staking',
  'Multi-tier token staking with time-weighted multipliers. 7 lock tiers (1d–365d), dual reward tokens (SPL + WSOL), on-chain distribution.',
  ARRAY['Rust', 'Anchor', 'Solana', 'TypeScript'],
  'solana-program',
  'active',
  'Cbhx5F1fVJG83xkqse88rxatrj73UW9Lz9G7awBrW8WZ',
  'solana',
  0
),
(
  'Mercenary Liquidity',
  'mercenary-liquidity',
  'On-chain LP bounty protocol. Projects escrow SOL to incentivize liquidity providers with time-locked claims and automatic fee collection.',
  ARRAY['Rust', 'Anchor', 'Solana', 'TypeScript'],
  'defi',
  'active',
  '3hDJRcAJf5AHrRgkXhUUCcTYQVMkCubh9M6kTrsBZv55',
  'solana',
  1
);
