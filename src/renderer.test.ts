import { describe, it, expect, beforeEach } from 'vitest';
import { render } from './renderer.js';
import { registry } from './registry.js';
import { Node } from './types.js';

describe('Renderer Engine', () => {
  beforeEach(() => {
    for (const key in registry) {
      delete registry[key];
    }
  });

  it('should pass style to components', () => {
    registry.Test = (props, _, style) => `<div style="color: ${style?.color}">${props.name}</div>`;
    
    const node: Node = {
      type: 'Test',
      props: { name: 'World' },
      style: { color: 'red' }
    };
    
    expect(render(node)).toBe('<div style="color: red">World</div>');
  });

  it('should render nested components with styles', () => {
    registry.Parent = (_, children, style) => `<section style="bg: ${style?.bg}">${children.join('')}</section>`;
    registry.Child = (props) => `<span>${props.value}</span>`;
    
    const node: Node = {
      type: 'Parent',
      style: { bg: 'blue' },
      children: [
        { type: 'Child', props: { value: 'A' } }
      ]
    };
    
    expect(render(node)).toBe('<section style="bg: blue"><span>A</span></section>');
  });
});