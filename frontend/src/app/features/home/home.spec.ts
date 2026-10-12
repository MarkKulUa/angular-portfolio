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
    expect(text(fixture)).toContain('unit of 7 (4 engineers, 3 business analysts');
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
