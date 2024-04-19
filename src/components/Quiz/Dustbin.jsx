import { useState } from 'react';
import { useDrop } from 'react-dnd';

function getStyle(backgroundColor, color) {
  return {
    backgroundColor,
    border: '1px solid rgb(0, 0, 0)',
    'margin-bottom': ' 5px',
    display: 'flex',
    'align-items': 'center',
    color,
    'justify-content': 'center',
    height: '46px',
    padding: '20px',
    'margin-top': '-15px',
  };
}

export const Dustbin = ({ callbackId, info, answers, preanswer }) => {
  const [id, setId] = useState();
  const [board, setBoard] = useState([]);
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: 'image',
      drop(_item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        addImageToBoard(_item);
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [setHasDropped, setHasDroppedOnChild]
  );

  let color = 'white';
  let backgroundColor = 'rgba(0, 0, 0, .5)';

  if (isOverCurrent || isOver || hasDropped) {
    color = 'black';
    backgroundColor = 'white';
  }

  let pretext = answers.filter((val) => {
    return val.id === preanswer?.option_value_id;
  });

  const addImageToBoard = (item) => {
    setId(item);
    const pictureList = answers.filter((pic) => item.id === pic.id);
    setBoard((prev) => [...prev, pictureList[0]]);
    setBoard([pictureList[0]]);
    callbackId(info, item.id, item);
  };

  return (
    <div ref={drop} style={getStyle(backgroundColor, color)}>
      <br />
      {hasDropped ? (
        <span>{board[0]?.answer_type_name}</span>
      ) : (
        <div>{pretext[0]?.answer_type_name}</div>
      )}
    </div>
  );
};
