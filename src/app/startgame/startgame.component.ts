import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { Game, GameMode, StartingScore } from '../models/game';
import { Player } from '../models/player';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-startgame',
  imports: [FormsModule],
  templateUrl: './startgame.component.html',
  styleUrl: './startgame.component.less'
})
export class StartgameComponent {
  constructor(public gameService: GameService) { } 

  public selectedGameMode: GameMode | null = null;
  public selectedStartingScore: StartingScore | null = null;
  public isElimination: boolean = false;

  GameMode = GameMode;
  StartingScore = StartingScore;

  public gameModeOptions: GameMode[] = [ GameMode.SingleOut, GameMode.DoubleOut ];
  public startingScoreOptions: StartingScore[] = [ StartingScore.Short, StartingScore.Medium, StartingScore.Long ];

  public playerList: Player[] = [];

  public startGame() {
    const game: Game = { gameMode: this.selectedGameMode!, players: this.playerList, startingScore: this.selectedStartingScore ?? StartingScore.Short, isElimination: this.isElimination };

    game.players.forEach(player => player.score = this.selectedStartingScore!);
    this.gameService.newGame(game);
  }

  public setGameMode(gameModeToSet: GameMode) {
    this.selectedGameMode = gameModeToSet
  }

  public setStartingScore(startingScoreToSet: StartingScore) {
    this.selectedStartingScore = startingScoreToSet
  }

  public addPlayer(name: string, inputElement: HTMLInputElement) {
    let newPlayer: Player = { id: this.playerList.length, name: name, score: 0, average: 0, shotDartsCount: 0 };
    this.playerList.push(newPlayer);
    inputElement.value = '';
  }

  public removePlayer(name: string) {
    const index = this.playerList.findIndex(player => player.name === name);

    if (index !== -1) {
      this.playerList.splice(index, 1);
    }  
  }

}
