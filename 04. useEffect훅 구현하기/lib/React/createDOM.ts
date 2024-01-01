interface VirtualDomNode {
  tag: string;
  props?: any;
  children: VirtualDomNode[];
}

type VirtualDomTextNode = string | number | boolean;
type VirtualDom = VirtualDomNode | VirtualDomTextNode;
type RealDom = HTMLElement;

// type predicates를 사용해 타입 단언하기
function checkVirtualDomTextNode(
  element: VirtualDomNode | VirtualDomTextNode
): element is VirtualDomTextNode {
  return (
    typeof element === "string" ||
    typeof element === "boolean" ||
    typeof element === "number"
  );
}

export function createDOM(element: VirtualDom): RealDom | Text {
  // 현재 element가 textNode인지 확인한다.
  if (checkVirtualDomTextNode(element)) {
    //textNode일 경우 현재 element를 그대로 반환한다.
    return document.createTextNode(element.toString());
  }

  // tag로 Element를 생성한다.
  const dom: RealDom = document.createElement(element.tag);

  // props가 존재 할 경우 실제 element에 이를 추가한다.
  if (element.props) {
    Object.keys(element.props).forEach((key) => {
      (dom as any)[key] = element.props[key];
    });
  }

  // 자식들을 재귀적으로 돌며 위 과정을 반복한다.
  element.children.forEach((child: VirtualDom) => {
    dom.append(createDOM(child));
  });

  return dom;
}
