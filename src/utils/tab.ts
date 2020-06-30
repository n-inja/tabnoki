import { Node } from "../tabDependent";

export function removeTab(node: Node) {
  chrome.tabs.remove(node.id);
  node.children.forEach(removeTab);
}
