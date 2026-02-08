import { getProfile, getProjects, getContributions } from '@/lib/data';
import { TerminalWindow } from '@/components/TerminalWindow';
import { TerminalPrompt } from '@/components/TerminalPrompt';
import { SectionAbout } from '@/components/SectionAbout';
import { SectionProjects } from '@/components/SectionProjects';
import { SectionSkills } from '@/components/SectionSkills';
import { SectionContributions } from '@/components/SectionContributions';
import { SectionContact } from '@/components/SectionContact';

export default async function Home() {
  const [profile, projects, contributions] = await Promise.all([
    getProfile(),
    getProjects(),
    getContributions(),
  ]);

  const allSkills = [...new Set(projects.flatMap(p => p.tech_stack))];

  const now = new Date();
  const loginDate = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="min-h-screen py-8 px-4 md:py-16">
      <TerminalWindow>
        <p className="text-terminal-dim mb-4">
          Last login: {loginDate} on ttys000
        </p>

        <TerminalPrompt command="cat about.md" />
        <SectionAbout profile={profile} />

        <TerminalPrompt command="ls -la projects/" />
        <SectionProjects projects={projects} />

        <TerminalPrompt command="cat skills.json | jq ." />
        <SectionSkills skills={allSkills} />

        <TerminalPrompt command="git log --oneline contributions/" />
        <SectionContributions contributions={contributions} />

        <TerminalPrompt command="curl nullopcode.cv/contact" />
        <SectionContact profile={profile} />

        <TerminalPrompt command="" showCursor />
      </TerminalWindow>
    </main>
  );
}
