import { getProfile, getProjects, getContributions } from '@/lib/data';
import { ProfileHeader } from '@/components/ProfileHeader';
import { TerminalWindow } from '@/components/TerminalWindow';
import { TerminalPrompt } from '@/components/TerminalPrompt';
import { SectionProjects } from '@/components/SectionProjects';
import { SectionSkills } from '@/components/SectionSkills';
import { SectionContributions } from '@/components/SectionContributions';

export default async function Home() {
  const [profile, projects, contributions] = await Promise.all([
    getProfile(),
    getProjects(),
    getContributions(),
  ]);

  const allSkills = [...new Set(projects.flatMap(p => p.tech_stack))];

  return (
    <main className="min-h-screen py-8 px-4 md:py-16 max-w-4xl mx-auto">
      <ProfileHeader profile={profile} />

      <div className="mt-8">
        <TerminalWindow>
          <TerminalPrompt command="ls -la projects/" />
          <SectionProjects projects={projects} />

          <TerminalPrompt command="cat skills.json | jq ." />
          <SectionSkills skills={allSkills} />

          {contributions.length > 0 && (
            <>
              <TerminalPrompt command="git log --oneline contributions/" />
              <SectionContributions contributions={contributions} />
            </>
          )}

          <TerminalPrompt command="" showCursor />
        </TerminalWindow>
      </div>
    </main>
  );
}
