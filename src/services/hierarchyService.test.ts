import { describe, it, expect } from 'vitest';
import { HierarchyService } from './hierarchyService';

describe('HierarchyService', () => {
  it('creates hierarchy and returns stores', () => {
    const service = new HierarchyService();
    const hid = service.createHierarchy();
    const root = service.getRootId(hid);
    const fid = service.addNode(hid, root, {
      type: 'franchise',
      name: 'Joe\'s Franchise',
      number: '001',
    });
    const rid = service.addNode(hid, fid, {
      type: 'region',
      name: 'North',
      number: '01',
    });
    const sid = service.addNode(hid, rid, {
      type: 'store',
      name: 'Store A',
      number: '0001',
      address: '123 Main St',
    });
    const stores = service.listStores(hid, fid);
    expect(stores.map(s => s.id)).toContain(sid);
  });
});
