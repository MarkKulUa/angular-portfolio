import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFound } from './not-found';
import { queryAll } from '../../testing';

describe('NotFound', () => {
  it('has one h1 and links back to Home and Resume', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(NotFound);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(queryAll(fixture, 'h1').map((h) => h.textContent?.trim())).toEqual(['Page not found']);
    expect(queryAll<HTMLAnchorElement>(fixture, 'a').map((a) => a.getAttribute('href'))).toEqual([
      '/',
      '/resume',
    ]);
  });
});
