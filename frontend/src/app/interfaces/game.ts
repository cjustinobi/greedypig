export enum GameStatus {
  New = 'New',
  InProgress = 'In Progress',
  Cancelled = 'Cancelled',
  Ended = 'Ended',
}

export interface IGame {
  id: string
  gameName: string
  status: GameStatus
  gameSettings: {
    bet: boolean
    betAmount: number
    apparatus: string
  }
}
