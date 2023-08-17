// define the type for marks
type Marks = Record<string, unknown>;

// define the type for deserializeNodes
type DeserializeNodes = (el: ChildNode, marks?: Marks) => unknown;

export const deserializeNodes: DeserializeNodes = (el, marks = {}) => {
  if (el.nodeType === Node.TEXT_NODE) {
    return el.textContent;
  }

  if (el.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  let children = Array.from(el.childNodes).map(child =>
    deserializeNodes(child, marks),
  );

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  switch (el.nodeName) {
    // Elements:
    // case 'BODY':
    //   return jsx('fragment', {}, children);
    case 'BR':
      return '\n';
    default:
      return el.textContent;
  }
};

// define the type for deserialize
type Deserialize = (str: string) => unknown;

export const deserialize: Deserialize = str => {
  const domNodes = new DOMParser().parseFromString(str, 'text/html');

  return deserializeNodes(domNodes.body);
};
