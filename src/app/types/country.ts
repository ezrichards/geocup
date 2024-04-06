export interface CountryPlayer {
  name: string;
  count: number;
}

export type Country = {
  [language: string]: CountryPlayer[];
};

export type CountryData = [string, string, number];
