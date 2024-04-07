export interface Root {
  items: Item[];
  paginationToken: any;
}

export interface Item {
  gameToken: string;
  playerName: string;
  userId: string;
  totalScore: number;
  isLeader: boolean;
  pinUrl: string;
  game: Game;
}

export interface Game {
  token: string;
  type: string;
  mode: string;
  state: string;
  roundCount: number;
  timeLimit: number;
  forbidMoving: boolean;
  forbidZooming: boolean;
  forbidRotating: boolean;
  streakType: string;
  map: string;
  mapName: string;
  panoramaProvider: number;
  bounds: Bounds;
  round: number;
  rounds: Round[];
  player: Player;
  progressChange: ProgressChange;
  quickPlayProgress: any;
}

export interface Bounds {
  min: Min;
  max: Max;
}

export interface Min {
  lat: number;
  lng: number;
}

export interface Max {
  lat: number;
  lng: number;
}

export interface Round {
  lat: number;
  lng: number;
  panoId: string;
  heading: number;
  pitch: number;
  zoom: number;
  streakLocationCode: string;
  startTime: string;
}

export interface Player {
  totalScore: TotalScore;
  totalDistance: TotalDistance;
  totalDistanceInMeters: number;
  totalTime: number;
  totalStreak: number;
  guesses: Guess[];
  isLeader: boolean;
  currentPosition: number;
  pin: Pin;
  newBadges: any[];
  explorer: any;
  id: string;
  nick: string;
  isVerified: boolean;
  flair: number;
  countryCode: string;
}

export interface TotalScore {
  amount: string;
  unit: string;
  percentage: number;
}

export interface TotalDistance {
  meters: Meters;
  miles: Miles;
}

export interface Meters {
  amount: string;
  unit: string;
}

export interface Miles {
  amount: string;
  unit: string;
}

export interface Guess {
  lat: number;
  lng: number;
  timedOut: boolean;
  timedOutWithGuess: boolean;
  skippedRound: boolean;
  roundScore: RoundScore;
  roundScoreInPercentage: number;
  roundScoreInPoints: number;
  distance: Distance;
  distanceInMeters: number;
  streakLocationCode: any;
  time: number;
}

export interface RoundScore {
  amount: string;
  unit: string;
  percentage: number;
}

export interface Distance {
  meters: Meters2;
  miles: Miles2;
}

export interface Meters2 {
  amount: string;
  unit: string;
}

export interface Miles2 {
  amount: string;
  unit: string;
}

export interface Pin {
  url: string;
  anchor: string;
  isDefault: boolean;
}

export interface ProgressChange {
  xpProgressions: XpProgression[];
  awardedXp: AwardedXp;
  medal: number;
  competitiveProgress: any;
  rankedSystemProgress: any;
}

export interface XpProgression {
  xp: number;
  currentLevel: CurrentLevel;
  nextLevel: NextLevel;
  currentTitle: CurrentTitle;
}

export interface CurrentLevel {
  level: number;
  xpStart: number;
}

export interface NextLevel {
  level: number;
  xpStart: number;
}

export interface CurrentTitle {
  id: number;
  tierId: number;
  minimumLevel: number;
  name: string;
}

export interface AwardedXp {
  totalAwardedXp: number;
  xpAwards: XpAward[];
}

interface XpAward {
  xp: number;
  reason: string;
  count: number;
}
