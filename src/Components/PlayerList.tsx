//borrowed heavily from here https://codesandbox.io/s/draggable-material-ui-oj3wz

import * as React from 'react';
import PlayerListItem from './PlayerListItem';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder
} from 'react-beautiful-dnd';
import { PlayerInfo } from '../types';

export type DraggableListProps = {
  items: PlayerInfo[];
  onDragEnd: OnDragEndResponder;
};

const DraggableList = React.memo(({ items, onDragEnd }: DraggableListProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <PlayerListItem item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default DraggableList;