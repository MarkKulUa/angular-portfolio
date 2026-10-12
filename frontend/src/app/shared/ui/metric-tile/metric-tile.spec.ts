import { TestBed } from '@angular/core/testing';
import { MetricTile } from './metric-tile';
import { query, text } from '../../../testing';

describe('MetricTile', () => {
  it('renders value, label and optional context', async () => {
    const fixture = TestBed.createComponent(MetricTile);
    fixture.componentRef.setInput('metric', {
      value: '99.8%+',
      label: 'SLA',
      context: '5 quarters',
    });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(query(fixture, '.metric__value')?.textContent?.trim()).toBe('99.8%+');
    expect(text(fixture)).toContain('SLA');
    expect(text(fixture)).toContain('5 quarters');
  });

  it('omits the context line when there is none', async () => {
    const fixture = TestBed.createComponent(MetricTile);
    fixture.componentRef.setInput('metric', { value: '80–90%', label: 'delivered' });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(query(fixture, '.metric__context')).toBeNull();
  });
});
