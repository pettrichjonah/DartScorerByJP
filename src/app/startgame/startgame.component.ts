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
  constructor(private router: Router, public gameService: GameService) { } 

  public selectedGameMode: GameMode | null = null;
  public selectedStartingScore: StartingScore | null = null;
  public isElimination: boolean = false;

  GameMode = GameMode;
  StartingScore = StartingScore;

  public gameModeOptions: GameMode[] = [ GameMode.SingleOut, GameMode.DoubleOut ];
  public startingScoreOptions: StartingScore[] = [ StartingScore.Short, StartingScore.Medium, StartingScore.Long ];

  public playerList: Player[] = [ { id: 0, name: "JP", score: this.selectedStartingScore ?? StartingScore.Short, average: 0, shotDartsCount: 0 }, { id: 1, name: "Bot", score: this.selectedStartingScore ?? StartingScore.Short, average: 0, shotDartsCount: 0 }];

  public startGame() {
    const game: Game = { gameMode: this.selectedGameMode!, players: this.playerList, startingScore: this.selectedStartingScore ?? StartingScore.Short, isElimination: this.isElimination };

    this.gameService.newGame(game);
  }

  public setGameMode(gameModeToSet: GameMode) {
    this.selectedGameMode = gameModeToSet
  }

  public setStartingScore(StartingScoreToSet: StartingScore) {
    this.selectedStartingScore = StartingScoreToSet
  }

}
