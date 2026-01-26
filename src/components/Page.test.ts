import { describe, it, expect } from 'vitest';
import { Page } from './Page.js';

describe('Page Component', () => {
  it('should render the full HTML structure with children', () => {
    const children = ['<div id="test-child">Child Content</div>'];
    const html = Page({}, children, {});
    
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<div id="test-child">Child Content</div>');
  });
});