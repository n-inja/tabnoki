import Fuse from 'fuse.js'
import { Node } from './tabDependent';
import promisify from './utils/promisify';

const getTab = promisify(chrome.tabs.get);

function flatNodes(n: Node): number[] {
    if (n.children.length === 0) return ([] as number[]);
    const ret = n.children.map(flatNodes).reduce((a, b) => a.concat(b));
    ret.push(n.id);
    return retq;
}

export async function searchTab(n: Node, keyword: string) {
    const ids = flatNodes(n);
    const tabs = ids.map(async (e) => await getTab(e));
    const fuse = new Fuse(tabs, {
        keys: [ 'title' ]
    });
    return fuse.search(keyword);
}