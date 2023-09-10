export type Option = 'rock' | 'paper' | 'scissors';

export enum GameStates {
	WAITING = 'WAITING',
	CHOOSING = 'CHOOSING',
	VALIDATING = 'VALIDATING',
	WON = 'WON',
	LOST = 'LOST',
	DRAW = 'DRAW'
}
