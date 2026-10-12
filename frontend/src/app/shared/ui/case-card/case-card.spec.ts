import { TestBed } from '@angular/core/testing';
import { CaseCard } from './case-card';
import { query, queryAll } from '../../../testing';

describe('CaseCard', () => {
  it('leads with the result headline and keeps the details collapsed', async () => {
    const fixture = TestBed.createComponent(CaseCard);
    fixture.componentRef.setInput('caseStudy', {
      id: 'x',
      title: 'Title',
      headline: '15 systems moved to AWS in 3 months',
      challenge: 'C',
      approach: 'A',
      result: 'R',
      tags: ['AWS', 'Scrum'],
    });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(query(fixture, 'article')?.getAttribute('aria-labelledby')).toBe('case-x');
    expect(query(fixture, 'h3#case-x')?.textContent).toContain('15 systems moved to AWS');
    expect(query(fixture, '.case__eyebrow')?.textContent).toContain('Title');
    expect(query(fixture, '.case__result')?.textContent).toContain('R');

    const details = query<HTMLDetailsElement>(fixture, 'details')!;
    expect(details.open).toBe(false);
    expect(details.querySelector('summary')?.textContent).toContain('How it was done');
    expect(queryAll(fixture, 'details dt').map((dt) => dt.textContent?.trim())).toEqual([
      'Challenge',
      'Approach',
    ]);
    expect(queryAll(fixture, '.tag')).toHaveLength(2);
  });
});
