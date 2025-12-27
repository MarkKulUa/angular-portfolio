import { describe, it, expect } from 'vitest';
import { Home } from './home';

describe('Home', () => {
  it('should create instance', () => {
    const component = new Home();
    expect(component).toBeTruthy();
  });
});
