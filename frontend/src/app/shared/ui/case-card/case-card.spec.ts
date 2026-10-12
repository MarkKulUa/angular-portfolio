import { TestBed } from '@angular/core/testing';
import { CaseCard } from './case-card';
import { query, queryAll } from '../../../testing';

describe('CaseCard', () => {
  it('renders an article with challenge, approach, result and tags', async () => {
    const fixture = TestBed.createComponent(CaseCard);
    fixture.componentRef.setInput('caseStudy', {
      id: 'x',
      title: 'Title',
      challenge: 'C',
      approach: 'A',
      result: 'R',
      tags: ['AWS', 'Scrum'],
    });
    fixture.detectChanges();
    await fixture.whenStable();

    const article = query(fixture, 'article');
    expect(article?.getAttribute('aria-labelledby')).toBe('case-x');
    expect(query(fixture, '#case-x')?.textContent).toContain('Title');
    expect(queryAll(fixture, 'dt').map((dt) => dt.textContent?.trim())).toEqual([
      'Challenge',
      'Approach',
      'Result',
    ]);
    expect(queryAll(fixture, '.tag')).toHaveLength(2);
  });
});
