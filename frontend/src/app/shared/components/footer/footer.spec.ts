import { TestBed } from '@angular/core/testing';
import { PROFILE } from '@core/content/profile.content';
import { Footer } from './footer';
import { query } from '../../../testing';

describe('Footer', () => {
  async function render(
    showTechStack?: boolean
  ): Promise<ReturnType<typeof TestBed.createComponent<Footer>>> {
    const fixture = TestBed.createComponent(Footer);
    fixture.componentRef.setInput('person', PROFILE.person);
    if (showTechStack !== undefined) {
      fixture.componentRef.setInput('showTechStack', showTechStack);
    }
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  it('shows the tech stack by default', async () => {
    const fixture = await render();
    expect(query(fixture, '.tech-stack')).not.toBeNull();
  });

  it('hides the tech stack when asked (EM landing page)', async () => {
    const fixture = await render(false);
    expect(query(fixture, '.tech-stack')).toBeNull();
    expect(query(fixture, 'a[href*="linkedin"]')).not.toBeNull();
  });
});
