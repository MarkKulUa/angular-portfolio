import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CvPdfService } from '@core/cv/cv-pdf.service';
import { PROFILE } from '@core/content/profile.content';
import { Resume } from './resume';
import { query, queryAll, text } from '../../testing';

describe('Resume', () => {
  const cvPdf = {
    download: vi.fn(),
    generating: signal(false),
    error: signal<string | null>(null),
  };

  async function setup(): Promise<ReturnType<typeof TestBed.createComponent<Resume>>> {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: CvPdfService, useValue: cvPdf }],
    });
    const fixture = TestBed.createComponent(Resume);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('has a single h1 with the name and the EM headline', async () => {
    const fixture = await setup();

    expect(queryAll(fixture, 'h1').map((h) => h.textContent?.trim())).toEqual(['Mark Kulishov']);
    expect(query(fixture, '.role')?.textContent).toContain('Engineering Manager');
  });

  it('renders the six competency groups as plain text, not pills', async () => {
    const fixture = await setup();

    expect(queryAll(fixture, '.group__title').map((t) => t.textContent?.trim())).toEqual(
      PROFILE.competencies.map((c) => c.title)
    );
    expect(query(fixture, '#competencies .tag')).toBeNull();
    expect(query(fixture, '.group__items')?.textContent).toContain(
      'Hiring and onboarding, Probation'
    );
  });

  it('has a table of contents that links to every resume section', async () => {
    const fixture = await setup();
    const links = queryAll<HTMLAnchorElement>(fixture, 'app-resume-toc a');

    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/resume#summary',
      '/resume#competencies',
      '/resume#experience',
      '/resume#projects',
      '/resume#education',
      '/resume#certifications',
    ]);
    for (const a of links) {
      const id = a.getAttribute('href')!.split('#')[1];
      expect(query(fixture, `section#${id}`), id).not.toBeNull();
    }
  });

  it('renders PrivatBank with four nested roles in order', async () => {
    const fixture = await setup();

    expect(query(fixture, '.employer__name')?.textContent).toContain('PrivatBank');
    expect(queryAll(fixture, '.role__title').map((t) => t.textContent?.trim())).toEqual([
      'Team Lead & Delivery Manager',
      'Tech Lead (acting Engineering Manager)',
      'Senior Full-Stack Developer',
      'Full-Stack Developer',
    ]);
    expect(text(fixture)).toContain('Jul 2011 – Present');
  });

  it('lists independent projects separately and features AWS first', async () => {
    const fixture = await setup();

    expect(queryAll(fixture, '.project')).toHaveLength(PROFILE.independentProjects.length);
    expect(query(fixture, '.featured__name')?.textContent).toContain(
      'AWS Certified Solutions Architect – Associate'
    );
    expect(text(fixture)).toContain('Expires Aug 2029');
    expect(queryAll(fixture, '.grid .card')).toHaveLength(PROFILE.certifications.length - 1);
  });

  it('shows no phone or email and links to LinkedIn', async () => {
    const fixture = await setup();
    const hrefs = queryAll<HTMLAnchorElement>(fixture, 'a').map(
      (a) => a.getAttribute('href') ?? ''
    );

    expect(hrefs).toContain(PROFILE.person.links.linkedin);
    expect(hrefs.join()).not.toMatch(/mailto:|tel:/);
  });

  it('shows the generating state and the error message from the PDF service', async () => {
    const fixture = await setup();
    cvPdf.generating.set(true);
    cvPdf.error.set('PDF failed');
    fixture.detectChanges();
    await fixture.whenStable();

    const button = query<HTMLButtonElement>(fixture, '.btn-download')!;
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Preparing');
    expect(query(fixture, '.cv-error')?.textContent).toContain('PDF failed');
  });
});
