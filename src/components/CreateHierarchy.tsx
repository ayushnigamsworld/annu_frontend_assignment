import React from 'react';

interface Props {
  onCreate: () => void;
  hierarchyId: string | null;
  rootId: string | null;
}

const CreateHierarchy: React.FC<Props> = ({ onCreate, hierarchyId, rootId }) => {
  return (
    <div>
      <button onClick={onCreate}>Create New Hierarchy</button>
      {hierarchyId && (
        <p>
          Created hierarchy {hierarchyId} with root node {rootId}
        </p>
      )}
    </div>
  );
};

export default CreateHierarchy;
