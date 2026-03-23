import { describe, it, expect } from 'vitest';
import { NotFound } from './not-found';

describe('NotFound', () => {
  it('should create instance', () => {
    const component = new NotFound();
    expect(component).toBeTruthy();
  });
});
