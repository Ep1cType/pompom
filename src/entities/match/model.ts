export type MatchState =
  | "NO_SHOW"
  | "WALK_OVER"
  | "NO_PARTY"
  | "DONE"
  | "SCORE_DONE";
export type PlayerStatus =
  | "PLAYED"
  | "NO_SHOW"
  | "WALK_OVER"
  | "NO_PARTY"
  | null;

export interface Participants {
  id: string; // Unique identifier of any kind
  resultText: string | number; // Any string works
  isWinner: boolean;
  status: PlayerStatus;
  name: string;
}

export interface SingleEliminationMatch {
  id: number | string;
  name: string;
  nextMatchId?: number | null; // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
  tournamentRoundText: string; // Text for Round Header
  startTime: string; // YYYY-MM-DD
  state: MatchState; // Only needed to decide walkovers and if teamNames are TBD (to be decided)
  participants?: Participants[];
}
