import { Button } from "@mui/material";
import React from "react";
import { useReducer } from "react";
import { useImmerReducer } from "use-immer";
import PlayerList from "./Components/PlayerList";
import { PlayerAction, PlayerInfo } from "./types";

const initialState = [] as PlayerInfo[];
let nextId = 0;

export const PlayerContext = React.createContext<PlayerInfo[] | undefined>(
  undefined
);
export const PlayerDispatchContext = React.createContext<
  React.Dispatch<PlayerAction> | undefined
>(undefined);

function reducer(draft: PlayerInfo[], action: PlayerAction) {
  switch (action.type) {
    case "add":
      draft.push({
        id: nextId.toString(),
        trackId: "",
        name: "",
        playDurationInMs: 0,
        trackName: "",
        trackStartPosition: 0,
        playerNumber: 0,
      } as PlayerInfo);
      nextId++;
      break;
    case "delete":
      if (action.player && action.player !== null) {
        let playerIndex = draft.findIndex(
          (t) => t.id == action?.player?.id ?? 0
        );
        if (playerIndex > -1) {
          draft.splice(playerIndex, 1);
        }
      }
      break;
    case "update":
      if (action.player && action.player !== null) {
        let playerUpdIndex = draft.findIndex(
          (t) => t.id == action?.player?.id ?? 0
        );
        if (playerUpdIndex > -1) {
          draft[playerUpdIndex] = action.player;
        }
      }
      break;
    default:
      throw new Error();
  }
}

export function Home() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <PlayerDispatchContext.Provider value={dispatch}>
      <PlayerContext.Provider value={state}>
        <div style={{ maxWidth: 500 }}>
          <h3>Walkout for Bruisers</h3>
          <Button onClick={() => dispatch({ type: "add", player: null })}>
            Add Player
          </Button>
          <PlayerList
            items={state}
            onDragEnd={() => console.log("Your dragged it")}
          />
        </div>
      </PlayerContext.Provider>
    </PlayerDispatchContext.Provider>
  );
}
export default Home;
