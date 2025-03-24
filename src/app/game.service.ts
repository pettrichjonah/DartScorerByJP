import { Injectable } from '@angular/core';
import { Player } from './models/player';
import { Game, GameMode, Multiplicator, StartingScore } from './models/game';
import { Shot } from './models/shot';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Remove this after debugging
  public playerList: Player[] = [ { id: 0, name: "JP", score: 60, average: 0, shotDartsCount: 0 }, { id: 1, name: "Bot", score: 60, average: 0, shotDartsCount: 0 }];

  public currentGame: Game | undefined = { gameMode: GameMode.DoubleOut, players: this.playerList, startingScore: StartingScore.Short, isElimination: false};
  
  public shotScores: Shot[] = [];
  public activePlayerId: number = 0;
  public nextPlayerIsActivated = false;
  public lastTurnResult: string = "";

  constructor(private router: Router) { } 

  public registerShot(shot: Shot) {
    if (!this.currentGame) {
      return;
    }

    if (this.shotScores.length < 3) {
      this.currentGame.players[this.activePlayerId].score -= shot.score*shot.multiplicator;
      this.shotScores.push(shot);
    }

    this.checkWinner(shot.multiplicator);
    this.checkElimination();
    this.lastTurnResult = this.getScoreSum().toString();

    if( this.checkIfNoScore(shot) || this.shotScores.length >= 3)
      this.nextPlayerIsActivated = true; 

    this.playerList[this.activePlayerId].shotDartsCount += 1;
  }

  public undoShot() {
    if (!this.currentGame) {
      return;
    }

    let lastShotSum = this.shotScores[this.shotScores.length-1].score*this.shotScores[this.shotScores.length-1].multiplicator;

    if (this.lastTurnResult !== "No Score!")
    {
      this.currentGame.players[this.activePlayerId].score += lastShotSum; 
      this.shotScores.pop(); 
    }
    else
    {
      this.shotScores.pop();
      this.currentGame.players[this.activePlayerId].score -= this.getScoreSum();  

      this.lastTurnResult = "Anything";
    }

    this.playerList[this.activePlayerId].shotDartsCount -= 1;

    this.nextPlayerIsActivated = false;
  }

  public getScoreSum(): number {
    const scoreSum = this.shotScores.reduce((acc, num) => acc + num.score * num.multiplicator, 0);
    return scoreSum;
  }

  public nextPlayer() {
    if (!this.currentGame) {
      return;
    }

    this.calculateAndSetAverage();

    this.activePlayerId += 1;

    if (this.activePlayerId >= this.currentGame.players.length)
      this.activePlayerId = 0;

    this.shotScores = [];
    this.nextPlayerIsActivated = false;
  }

  public resetGame() {
    if (!this.currentGame) {
      return;
    }

    this.shotScores = [];
    this.currentGame.players.forEach(player => player.score = this.currentGame?.startingScore!);
    this.activePlayerId = 0;
    this.currentGame = undefined;
    this.nextPlayerIsActivated = false;
  }

  public newGame(gameOptions: Game) {
    this.currentGame = gameOptions;
    this.router.navigate(['/play']);
  }

  private checkWinner(multiplicator: Multiplicator): void {
    if (!this.currentGame)
      return;

    if (this.currentGame.gameMode === GameMode.DoubleOut) {
      if (this.currentGame.players[this.activePlayerId].score === 0 && multiplicator === Multiplicator.Double) {
        this.resetGame();
        this.router.navigate(['/wehaveawinner']);
      }
    }
    else if (this.currentGame.gameMode === GameMode.SingleOut) {
      if (this.currentGame.players[this.activePlayerId].score === 0)
      {
        this.resetGame();
        this.router.navigate(['/wehaveawinner']);
      }
    }
  }

  private checkElimination() {
    if (!this.currentGame)
      return;

    if (this.currentGame.isElimination) {
      const scoreThatCanBeatOtherPlayers = this.currentGame.players[this.activePlayerId].score;
      this.currentGame.players.forEach(player => {
        if (player.score === scoreThatCanBeatOtherPlayers && player.id !== this.activePlayerId)
          player.score = this.currentGame?.startingScore!;
      })
    }
  }

  private checkIfNoScore(shot: Shot): boolean {
    if (!this.currentGame)
      return false;

    let currentScore = this.currentGame.players[this.activePlayerId].score;

    if (this.currentGame.gameMode === GameMode.DoubleOut) {
      if (currentScore<=1) {
        this.currentGame.players[this.activePlayerId].score += this.getScoreSum();
        this.lastTurnResult = "No Score!";
        return true;
      }
    }
    else if (this.currentGame.gameMode === GameMode.SingleOut) {
      if (currentScore<=0) {
        this.currentGame.players[this.activePlayerId].score += this.getScoreSum();
        this.lastTurnResult = "No Score!";
        return true;
      }
    }

    return false;
  }

  private calculateAndSetAverage() {
    const currentPlayer = this.playerList[this.activePlayerId];
    const threeDartAverage = (60 - currentPlayer.score) / (currentPlayer.shotDartsCount / 3);

    this.playerList[this.activePlayerId].average = Math.ceil(threeDartAverage);
  }
}
