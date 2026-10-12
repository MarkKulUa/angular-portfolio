import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Lab } from './lab';
import { LAB_DEMOS } from './lab.content';
import { queryAll, text } from '../../testing';

describe('Lab', () => {
  async function setup(): Promise<ReturnType<typeof TestBed.createComponent<Lab>>> {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Lab);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('links every demo card to a /lab route', async () => {
    const fixture = await setup();
    const hrefs = queryAll<HTMLAnchorElement>(fixture, '.demo__link').map((a) =>
      a.getAttribute('href')
    );

    expect(hrefs).toEqual(LAB_DEMOS.map((d) => d.link));
    expect(hrefs.every((h) => h?.startsWith('/lab/'))).toBe(true);
  });

  it('explains how the site is built without linking to the private repository', async () => {
    const fixture = await setup();

    expect(text(fixture)).toContain('How this site is built');
    expect(text(fixture)).toContain('Spec-driven, AI-assisted workflow');
    expect(text(fixture)).not.toContain('Secret Club');
    const hrefs = queryAll<HTMLAnchorElement>(fixture, 'a').map(
      (a) => a.getAttribute('href') ?? ''
    );
    expect(hrefs.join()).not.toMatch(/github\.com/);
  });
});
