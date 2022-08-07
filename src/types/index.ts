
export interface IGame {
  id: number,
  members: Array<string>,
  status: number,
}

export enum GameType {
  BU = 0,
  JIANDAO = 1,
  SHITOU = 2,
}