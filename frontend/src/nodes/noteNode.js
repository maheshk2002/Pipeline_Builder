import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeHeaderColor, getNodeHeaderTextColor } from './nodeConfig';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Type your notes here...');

  return (
    <BaseNode
      id={id}
      title="NOTE"
      headerColor={getNodeHeaderColor('note')}
      headerTextColor={getNodeHeaderTextColor('note')}
    >
      <textarea
        className="base-node__textarea base-node__textarea--note nodrag"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
      />
    </BaseNode>
  );
};
