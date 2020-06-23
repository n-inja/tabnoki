export interface Node {
  id: number;
  children: Array<Node>;
}

type Graph = Array<Node>;

export function convert(dat: Record<string, number>): Graph {
  const nodes = {} as Record<number, Node>;

  const addNode = (id: number) => {
    nodes[id] = { id, children: new Array<Node>() };
  };

  for (const key in dat) {
    const id1 = Number(key);
    const id2 = Number(dat[key]);
    addNode(id1);
    addNode(id2);
  }

  const hasParents = new Set<number>();
  for (const key in dat) {
    const val = dat[key];
    const from = Number(val);
    const to = Number(key);
    nodes[from]?.children?.push(nodes[to]);
    hasParents.add(to);
  }

  const ret = [] as Graph;
  for (const key in nodes) {
    const node = nodes[key];
    if (node === null) {
      continue;
    }
    const id = node.id;
    if (!hasParents.has(id)) {
      ret.push(node);
    }
  }
  return ret;
}
