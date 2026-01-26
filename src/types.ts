export interface Node {
  type: string;
  props?: Record<string, unknown>;
  style?: Record<string, string>;
  children?: Node[];
}

export type ComponentHTML = string;
export type Component = (
  props: Record<string, unknown>,
  children: ComponentHTML[],
  style?: Record<string, string>
) => ComponentHTML;