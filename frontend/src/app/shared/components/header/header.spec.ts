import { describe, it, expect } from 'vitest';
import { Header } from './header';

describe('Header', () => {
  it('should create instance', () => {
    const component = new Header();
    expect(component).toBeTruthy();
  });
});
