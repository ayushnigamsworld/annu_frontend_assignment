import React, { useState } from 'react';
import { HierarchyService, NodeType } from '../services/hierarchyService';

interface Props {
  hierarchyId: string;
  service: HierarchyService;
}

const AddNode: React.FC<Props> = ({ hierarchyId, service }) => {
  const [parentId, setParentId] = useState('');
  const [type, setType] = useState<NodeType>('franchise');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [createdId, setCreatedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nodeId = service.addNode(hierarchyId, parentId, {
        type,
        name,
        number,
        address: type === 'store' ? address : undefined,
      });
      setCreatedId(nodeId);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div>
      <h2>Add Node</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Parent ID:</label>
          <input value={parentId} onChange={e => setParentId(e.target.value)} />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={e => setType(e.target.value as NodeType)}>
            <option value="franchise">Franchise</option>
            <option value="region">Region</option>
            <option value="store">Store</option>
          </select>
        </div>
        <div>
          <label>Name:</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Number:</label>
          <input value={number} onChange={e => setNumber(e.target.value)} />
        </div>
        {type === 'store' && (
          <div>
            <label>Address:</label>
            <input value={address} onChange={e => setAddress(e.target.value)} />
          </div>
        )}
        <button type="submit">Add</button>
      </form>
      {createdId && <p>Created node {createdId}</p>}
    </div>
  );
};

export default AddNode;
