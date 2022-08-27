
import { Draggable } from 'react-beautiful-dnd';

import {ListItem,ListItemAvatar,ListItemText,Avatar} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PersonIcon from '@mui/icons-material/Person';


import { PlayerInfo } from '../types';

const useStyles = makeStyles({
  draggingListItem: {
    background: 'rgb(235,235,235)'
  }
});

export type DraggableListItemProps = {
  item: PlayerInfo;
  index: number;
};

const DraggableListItem = ({ item, index }: DraggableListItemProps) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ''}
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={item.trackName} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;