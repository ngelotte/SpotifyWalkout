export type PlayerInfo = {
    id: string;
    playerNumber: number
    name: string;
    trackId: string;
    trackName: string;
    trackStartPosition: number;
    playDurationInMs: number;
  };

  export type PlayerAction ={
    type: "add" | "update" | "delete",
    player: PlayerInfo | null

  }
  