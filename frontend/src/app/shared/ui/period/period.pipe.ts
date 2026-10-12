import { Pipe, PipeTransform } from '@angular/core';
import { Period } from '@shared/models/profile.model';

export function formatPeriod(period: Period): string {
  return `${period.start} – ${period.end}`;
}

@Pipe({
  name: 'period',
})
export class PeriodPipe implements PipeTransform {
  transform(period: Period): string {
    return formatPeriod(period);
  }
}
