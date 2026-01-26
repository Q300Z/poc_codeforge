export interface Node {
  type: string;
  props?: Record<string, any>;
  style?: Record<string, string>;
  children?: Node[];
}

export type ComponentHTML = string;
export type Component = (props: any, children: ComponentHTML[], style?: Record<string, string>) => ComponentHTML;
