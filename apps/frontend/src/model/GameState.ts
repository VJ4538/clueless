export interface Player {
  name: string;
  character: string;
  current_room: string;
  has_made_suggestion: boolean;
}

export interface GameState {
  current_turn: string;
  players: Player[];
  rooms: string[];
  suggestions: { player: string; suggestion: string }[];
}
