import React from 'react';
import { useDrag } from 'react-dnd';

function Picture({ answer, id }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id: id, answer: answer },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  return (
    <div ref={drag} style={{ border: isDragging ? '5px solid gray' : '0px' }}>
      <div style={{ padding: '20px' }}>{answer}</div>
    </div>
  );
}

export default Picture;
