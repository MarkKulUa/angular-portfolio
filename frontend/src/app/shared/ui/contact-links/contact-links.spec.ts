import { TestBed } from '@angular/core/testing';
import { ContactLinks } from './contact-links';
import { queryAll } from '../../../testing';

describe('ContactLinks', () => {
  const links = { linkedin: 'https://linkedin.example/', credly: 'https://credly.example/' };

  it('renders LinkedIn and Credly as safe external links', async () => {
    const fixture = TestBed.createComponent(ContactLinks);
    fixture.componentRef.setInput('links', links);
    fixture.detectChanges();
    await fixture.whenStable();

    const anchors = queryAll<HTMLAnchorElement>(fixture, 'a');
    expect(anchors.map((a) => a.getAttribute('href'))).toEqual([links.linkedin, links.credly]);
    for (const a of anchors) {
      expect(a.target).toBe('_blank');
      expect(a.rel).toContain('noopener');
    }
  });

  it('can hide Credly and never renders mailto or tel links', async () => {
    const fixture = TestBed.createComponent(ContactLinks);
    fixture.componentRef.setInput('links', links);
    fixture.componentRef.setInput('showCredly', false);
    fixture.detectChanges();
    await fixture.whenStable();

    const hrefs = queryAll<HTMLAnchorElement>(fixture, 'a').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([links.linkedin]);
    expect(hrefs.join()).not.toMatch(/mailto:|tel:/);
  });
});
