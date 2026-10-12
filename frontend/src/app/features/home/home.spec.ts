import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { CvPdfService } from '@core/cv/cv-pdf.service';
import { PROFILE } from '@core/content/profile.content';
import { Home } from './home';
import { query, queryAll, text } from '../../testing';

describe('Home (EM landing)', () => {
  const cvPdf = { download: vi.fn(), generating: signal(false), error: signal(null) };

  async function setup(): Promise<ReturnType<typeof TestBed.createComponent<Home>>> {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: CvPdfService, useValue: cvPdf }],
    });
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  beforeEach(() => cvPdf.download.mockClear());

  it('positions Mark as an Engineering Manager above the fold', async () => {
    const fixture = await setup();
    const h1 = queryAll(fixture, 'h1');

    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toContain('Mark Kulishov');
    expect(h1[0].textContent).toContain('Engineering Manager');
    expect(text(fixture)).toContain('Open to Engineering Manager roles');
    expect(text(fixture)).toContain('Warsaw, Poland · Remote-first · EU time zone');
    expect(text(fixture)).toContain('cross-functional unit of 7');
    expect(text(fixture)).toContain(PROFILE.headline.statement);
    expect(query(fixture, '.hero__tagline')).toBeNull();
  });

  it('shows the three proof pillars in the hero', async () => {
    const fixture = await setup();
    const pillars = queryAll(fixture, '.hero .pillar');

    expect(pillars.map((p) => p.querySelector('.pillar__title')?.textContent?.trim())).toEqual(
      PROFILE.headline.pillars.map((p) => p.title)
    );
    expect(pillars[1].textContent).toContain('2 weeks → 1–2 days');
  });

  it('shows the career path from 2011 to the current role and the next step', async () => {
    const fixture = await setup();
    const steps = queryAll(fixture, 'app-career-timeline .step');

    expect(steps.map((s) => s.querySelector('.step__title')?.textContent?.trim())).toEqual([
      'Full-Stack Developer',
      'Senior Full-Stack Developer',
      'Tech Lead (acting Engineering Manager)',
      'Team Lead & Delivery Manager',
      'Engineering Manager',
    ]);
    const current = query(fixture, '.step--current')!;
    expect(current.getAttribute('aria-current')).toBe('step');
    expect(current.textContent).toContain('Jul 2025 – Present');
    expect(current.textContent).toContain('Now');
    expect(steps[4].classList).toContain('step--next');
  });

  it('offers resume, CV and LinkedIn actions but no demo links', async () => {
    const fixture = await setup();
    const hrefs = queryAll<HTMLAnchorElement>(fixture, '.hero a').map((a) =>
      a.getAttribute('href')
    );

    expect(hrefs).toContain('/resume');
    expect(hrefs).toContain(PROFILE.person.links.linkedin);
    expect(hrefs.join()).not.toMatch(/pokemon|auth|lab/);
  });

  it('downloads the CV from the hero', async () => {
    const fixture = await setup();
    query<HTMLButtonElement>(fixture, '.hero button')!.click();

    expect(cvPdf.download).toHaveBeenCalledTimes(1);
  });

  it('renders every metric, case study and principle from the content', async () => {
    const fixture = await setup();

    expect(queryAll(fixture, 'app-metric-tile')).toHaveLength(PROFILE.impactMetrics.length);
    expect(queryAll(fixture, 'app-case-card')).toHaveLength(PROFILE.caseStudies.length);
    expect(queryAll(fixture, '.principle')).toHaveLength(PROFILE.principles.length);
  });
});
