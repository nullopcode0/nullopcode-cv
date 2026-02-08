-- nullopcode.cv schema + seed data
-- Run this in Supabase SQL Editor

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle text NOT NULL,
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL DEFAULT '',
  email text,
  website text,
  solana_address text,
  github_url text,
  x_url text,
  farcaster_url text,
  bluesky_url text,
  lens_url text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  tech_stack text[] NOT NULL DEFAULT '{}',
  category text NOT NULL DEFAULT 'other',
  status text NOT NULL DEFAULT 'building',
  program_id text,
  chain text,
  url text,
  github_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_name text NOT NULL,
  repo_url text NOT NULL,
  description text NOT NULL DEFAULT '',
  pr_url text,
  contribution_type text NOT NULL DEFAULT 'pr',
  merged boolean DEFAULT false,
  contributed_at date,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- RLS: public read-only
-- ============================================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read contributions" ON contributions FOR SELECT USING (true);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO profile (handle, name, title, bio, website, solana_address, github_url, x_url, farcaster_url, bluesky_url, lens_url)
VALUES (
  'nullopcode',
  'nullopcode',
  'Solana Builder & Protocol Engineer',
  'Building on-chain programs, DeFi infrastructure, and open-source tooling. Focused on Solana — staking systems, liquidity protocols, and cross-platform automation.',
  'https://nullopcode.cv',
  'CGiuetrCxiaibJuxxCvrRjMyEjgmVEngxmvBXJtrmB5y',
  'https://github.com/nullopcode',
  'https://x.com/nullopcode',
  'https://warpcast.com/nullopcode',
  'https://bsky.app/profile/nullopcode.bsky.social',
  'https://hey.xyz/u/nullopcode'
);

INSERT INTO projects (name, slug, description, tech_stack, category, status, program_id, chain, url, sort_order) VALUES
(
  'SPL Token Staking',
  'spl-token-staking',
  'Multi-tier token staking with time-weighted multipliers. 7 lock tiers (1d–365d), dual reward tokens (SPL + WSOL), on-chain distribution.',
  ARRAY['Rust', 'Anchor', 'Solana', 'TypeScript'],
  'solana-program',
  'active',
  'Cbhx5F1fVJG83xkqse88rxatrj73UW9Lz9G7awBrW8WZ',
  'solana',
  NULL,
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
  NULL,
  1
),
(
  'nullopcode-worker',
  'nullopcode-worker',
  'Cloudflare Worker for cross-platform social posting. Farcaster, Bluesky, Lens v3 in parallel. GitHub push via Git Trees API.',
  ARRAY['TypeScript', 'Cloudflare Workers', 'Viem', 'AT Protocol'],
  'worker',
  'shipped',
  NULL,
  NULL,
  'https://nullopcode-worker.nullopcode.workers.dev',
  2
);

INSERT INTO contributions (repo_name, repo_url, description, contribution_type, merged, contributed_at, sort_order) VALUES
(
  'solana-labs/solana',
  'https://github.com/solana-labs/solana',
  'Validator performance monitoring improvements',
  'pr',
  true,
  '2024-11-15',
  0
);

-- ============================================================
-- FIX: rename if old seed was already run
-- ============================================================
UPDATE projects SET name = 'SPL Token Staking', slug = 'spl-token-staking',
  description = 'Multi-tier token staking with time-weighted multipliers. 7 lock tiers (1d–365d), dual reward tokens (SPL + WSOL), on-chain distribution.'
WHERE slug = 'clawg-staking';
