import React from 'react';
import CreateHierarchy from './components/CreateHierarchy';
import AddNode from './components/AddNode';
import StoreList from './components/StoreList';
import { HierarchyService } from './services/hierarchyService';

const service = new HierarchyService();

const App: React.FC = () => {
  const [hierarchyId, setHierarchyId] = React.useState<string | null>(null);
  const [rootId, setRootId] = React.useState<string | null>(null);

  const handleCreate = () => {
    const hid = service.createHierarchy();
    const rid = service.getRootId(hid);
    setHierarchyId(hid);
    setRootId(rid);
  };

  return (
    <div>
      <h1>Hierarchy Manager</h1>
      <CreateHierarchy onCreate={handleCreate} hierarchyId={hierarchyId} rootId={rootId} />
      {hierarchyId && (
        <>
          <AddNode hierarchyId={hierarchyId} service={service} />
          <StoreList hierarchyId={hierarchyId} service={service} />
        </>
      )}
    </div>
  );
};

export default App;
