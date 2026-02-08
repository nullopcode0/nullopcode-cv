import type { Profile, Project, Contribution } from './types';

export function buildResumeHTML(
  profile: Profile,
  projects: Project[],
  contributions: Contribution[],
): string {
  const allSkills = [...new Set(projects.flatMap(p => p.tech_stack))];

  const projectRows = projects.map(p => `
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;align-items:baseline;">
        <strong style="font-size:13px;">${esc(p.name)}</strong>
        <span style="font-size:11px;color:#666;">${esc(p.chain || '')} &middot; ${esc(p.status)}</span>
      </div>
      <p style="margin:2px 0 0;font-size:12px;color:#333;">${esc(p.description)}</p>
      <p style="margin:2px 0 0;font-size:11px;color:#888;">${p.tech_stack.map(esc).join(' &middot; ')}</p>
      ${p.program_id ? `<p style="margin:1px 0 0;font-size:10px;color:#aaa;font-family:monospace;">Program: ${esc(p.program_id)}</p>` : ''}
    </div>
  `).join('');

  const contribRows = contributions.map(c => `
    <div style="margin-bottom:6px;font-size:12px;">
      <strong>${esc(c.repo_name)}</strong> &mdash; ${esc(c.description)}
      <span style="color:#888;">[${esc(c.contribution_type.toUpperCase())}${c.merged ? ', merged' : ''}]</span>
    </div>
  `).join('');

  const links: string[] = [];
  if (profile.github_url) links.push(`<a href="${esc(profile.github_url)}" style="color:#333;">GitHub</a>`);
  if (profile.x_url) links.push(`<a href="${esc(profile.x_url)}" style="color:#333;">X</a>`);
  if (profile.farcaster_url) links.push(`<a href="${esc(profile.farcaster_url)}" style="color:#333;">Farcaster</a>`);
  if (profile.website) links.push(`<a href="${esc(profile.website)}" style="color:#333;">${esc(profile.website)}</a>`);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
      font-size: 12px;
      line-height: 1.5;
      color: #1a1a1a;
      padding: 40px 48px;
      max-width: 816px;
    }
    a { color: #333; text-decoration: none; }
    h1 { font-size: 22px; font-weight: 700; margin-bottom: 2px; }
    h2 {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1a1a1a;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
      margin: 20px 0 10px;
    }
    .subtitle { font-size: 14px; color: #555; margin-bottom: 4px; }
    .links { font-size: 11px; color: #666; }
    .links a { margin-right: 12px; }
    .summary { font-size: 12px; color: #333; margin-top: 8px; line-height: 1.6; }
    .skills { font-size: 12px; color: #333; }
    .skill-tag {
      display: inline-block;
      background: #f0f0f0;
      padding: 1px 8px;
      border-radius: 3px;
      margin: 2px 4px 2px 0;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <h1>${esc(profile.name)}</h1>
  <div class="subtitle">${esc(profile.title)}</div>
  <div class="links">
    ${links.join(' &middot; ')}
    ${profile.email ? ` &middot; <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : ''}
  </div>

  <h2>Summary</h2>
  <div class="summary">${esc(profile.bio)}</div>

  <h2>Projects</h2>
  ${projectRows}

  <h2>Technical Skills</h2>
  <div class="skills">
    ${allSkills.map(s => `<span class="skill-tag">${esc(s)}</span>`).join('')}
  </div>

  ${contributions.length > 0 ? `
  <h2>Open Source</h2>
  ${contribRows}
  ` : ''}
</body>
</html>`;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
