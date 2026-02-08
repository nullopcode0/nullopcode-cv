import { NextResponse } from 'next/server';
import { getProfile, getProjects, getContributions } from '@/lib/data';
import { buildResumeHTML } from '@/lib/resume-html';

export const maxDuration = 30;

export async function GET() {
  try {
    const [profile, projects, contributions] = await Promise.all([
      getProfile(),
      getProjects(),
      getContributions(),
    ]);

    const html = buildResumeHTML(profile, projects, contributions);

    // Dynamic import to avoid bundling issues
    const puppeteer = await import('puppeteer-core');
    const chromium = await import('@sparticuz/chromium-min');

    const browser = await puppeteer.default.launch({
      args: [...chromium.default.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: { width: 816, height: 1056 },
      executablePath: await chromium.default.executablePath(
        'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'
      ),
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="nullopcode-resume.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
