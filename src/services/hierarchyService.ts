export type NodeType = 'jack' | 'franchise' | 'region' | 'store';

export interface BaseNode {
  id: string;
  type: NodeType;
  name: string;
  number: string;
  parentId?: string;
  children: string[];
}

export interface StoreNode extends BaseNode {
  type: 'store';
  address: string;
}

export type HierarchyNode = BaseNode | StoreNode;

interface Hierarchy {
  nodes: Map<string, HierarchyNode>;
  rootId: string;
}

export class HierarchyService {
  private hierarchies: Map<string, Hierarchy> = new Map();
  private hierarchyCounter = 1;
  private nodeCounter = 1;

  createHierarchy(): string {
    const hierarchyId = `h-${this.hierarchyCounter++}`;
    const rootId = `n-${this.nodeCounter++}`;
    const rootNode: HierarchyNode = {
      id: rootId,
      type: 'jack',
      name: 'Jack in the Box',
      number: '0',
      children: [],
    };
    const hierarchy: Hierarchy = {
      nodes: new Map([[rootId, rootNode]]),
      rootId,
    };
    this.hierarchies.set(hierarchyId, hierarchy);
    return hierarchyId;
  }

  getRootId(hierarchyId: string): string {
    const hierarchy = this.hierarchies.get(hierarchyId);
    if (!hierarchy) throw new Error('Hierarchy not found');
    return hierarchy.rootId;
  }

  addNode(
    hierarchyId: string,
    parentId: string,
    data: {
      type: NodeType;
      name: string;
      number: string;
      address?: string;
    }
  ): string {
    const hierarchy = this.hierarchies.get(hierarchyId);
    if (!hierarchy) throw new Error('Hierarchy not found');
    const parent = hierarchy.nodes.get(parentId);
    if (!parent) throw new Error('Parent node not found');

    const id = `n-${this.nodeCounter++}`;
    let newNode: HierarchyNode = {
      id,
      type: data.type,
      name: data.name,
      number: data.number,
      parentId,
      children: [],
    };
    if (data.type === 'store') {
      if (!data.address) throw new Error('Store requires an address');
      newNode = { ...newNode, type: 'store', address: data.address };
    }

    hierarchy.nodes.set(id, newNode);
    parent.children.push(id);
    return id;
  }

  listStores(hierarchyId: string, nodeId: string): StoreNode[] {
    const hierarchy = this.hierarchies.get(hierarchyId);
    if (!hierarchy) throw new Error('Hierarchy not found');
    const start = hierarchy.nodes.get(nodeId);
    if (!start) throw new Error('Node not found');

    const result: StoreNode[] = [];
    const visit = (id: string) => {
      const node = hierarchy.nodes.get(id);
      if (!node) return;
      if (node.type === 'store') {
        result.push(node as StoreNode);
      }
      node.children.forEach(visit);
    };
    visit(nodeId);
    return result;
  }
}
