import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';
import { query, queryAll } from '../../../testing';

describe('Header', () => {
  async function setup(): Promise<ReturnType<typeof TestBed.createComponent<Header>>> {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('shows the main navigation: Home, Resume, Lab', async () => {
    const fixture = await setup();
    const links = queryAll<HTMLAnchorElement>(fixture, '.nav-links a');

    expect(links.map((a) => a.textContent?.trim())).toEqual(['Home', 'Resume', 'Lab']);
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['/', '/resume', '/lab']);
    expect(fixture.nativeElement.textContent).not.toContain('Secret Club');
  });

  it('toggles the mobile menu and reflects it in aria-expanded', async () => {
    const fixture = await setup();
    const toggle = query<HTMLButtonElement>(fixture, '.menu-toggle')!;

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(query(fixture, '.menu')?.classList).toContain('menu--open');
  });

  it('emits downloadCv and closes the menu', async () => {
    const fixture = await setup();
    const spy = vi.fn();
    fixture.componentInstance.downloadCv.subscribe(spy);

    query<HTMLButtonElement>(fixture, '.menu-toggle')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    query<HTMLButtonElement>(fixture, '.cv-button')!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(query(fixture, '.menu')?.classList).not.toContain('menu--open');
  });
});
