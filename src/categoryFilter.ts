import { Node } from "./tabDependent";

function flatNodes(n: Node): Node[] {
  if (n.children.length === 0) return [n];
  const ret = n.children.map(flatNodes).reduce((a, b) => a.concat(b));
  ret.push(n);
  return ret;
}

export default function categoryFilter(
  rootNode: Node,
  category: string
): Node[] {
  return flatNodes(rootNode).filter((n) => n.categories?.includes(category));
}
