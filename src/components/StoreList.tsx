import React, { useState } from 'react';
import { HierarchyService, StoreNode } from '../services/hierarchyService';

interface Props {
  hierarchyId: string;
  service: HierarchyService;
}

const StoreList: React.FC<Props> = ({ hierarchyId, service }) => {
  const [nodeId, setNodeId] = useState('');
  const [stores, setStores] = useState<StoreNode[]>([]);

  const handleList = () => {
    try {
      const result = service.listStores(hierarchyId, nodeId);
      setStores(result);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div>
      <h2>List Stores</h2>
      <div>
        <label>Node ID:</label>
        <input value={nodeId} onChange={e => setNodeId(e.target.value)} />
        <button onClick={handleList}>List</button>
      </div>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            {store.name} ({store.number}) - {store.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
