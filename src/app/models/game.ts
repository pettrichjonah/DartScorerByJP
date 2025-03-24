import { Player } from "./player";

export interface Game {
	gameMode: GameMode,
	players: Player[],
	startingScore: StartingScore,
	isElimination: boolean,
}

export enum GameMode {
	SingleOut = "Single Out",
	DoubleOut = "Double Out",
}

export enum Multiplicator {
	Single = 1,
	Double = 2,
	Triple = 3,
}

export enum StartingScore {
	Short = 301,
	Medium = 501,
	Long = 701,
}