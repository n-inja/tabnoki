import Fuse from "fuse.js";
import { Node } from "./tabDependent";
import promisify from "./utils/promisify";

const getTab = promisify(chrome.tabs.get);

function flatNodes(n: Node): Node[] {
  if (n.children.length === 0) return [n];
  const ret = n.children.map(flatNodes).reduce((a, b) => a.concat(b));
  ret.push(n);
  return ret;
}

export default async function searchTab(
  rootNode: Node,
  keyword: string
): Promise<Node[]> {
  const ids = flatNodes(rootNode).filter((e) => e.id >= 0);
  const tabs = await Promise.all(
    ids.map(async (e) => ({ node: e, title: (await getTab(e.id)).title ?? "" }))
  );
  const fuse = new Fuse(tabs, {
    keys: ["title"],
  });
  return fuse.search(keyword).map((e) => e.item.node);
}
