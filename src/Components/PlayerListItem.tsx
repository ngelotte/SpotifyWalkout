import { Draggable } from "react-beautiful-dnd";

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";

import { PlayerInfo } from "../types";
import { PlayerContext, PlayerDispatchContext } from "../Home";
import { useContext } from "react";

const useStyles = makeStyles({
  draggingListItem: {
    background: "rgb(235,235,235)",
  },
});

export type DraggableListItemProps = {
  item: PlayerInfo;
  index: number;
};

const DraggableListItem = ({ item, index }: DraggableListItemProps) => {
  const classes = useStyles();
  const dispatch = useContext(PlayerDispatchContext) as any;
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          key={item.id}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                dispatch({ type: "delete", player: item });
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : ""}
        >
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={"Ethan Gelotte"} secondary={item.trackName} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
