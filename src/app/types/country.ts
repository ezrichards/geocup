export interface CountryPlayer {
  name: string;
  count: number;
}

export interface Country {
  id: string;
  players: CountryPlayer[];
}
