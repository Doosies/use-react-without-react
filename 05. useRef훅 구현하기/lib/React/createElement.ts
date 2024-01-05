interface VirtualDomNode {
  tag: string | Function;
  props?: any;
  ref?: HTMLElement | unknown | null;
  children: VirtualDomNode[];
}

export function createElement(
  tag: string | Function,
  props: { [key: string]: unknown },
  ...children: VirtualDomNode[]
): VirtualDomNode {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }

  return {
    tag,
    props,
    children: children, //.flat(),
  };
}
