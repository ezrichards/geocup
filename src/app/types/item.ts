import Game from "./game";

export default interface Item {
  gameToken: string;
  playerName: string;
  userId: string;
  totalScore: number;
  isLeader: boolean;
  pinUrl: string;
  game: Game;
}
