import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-scoreboard',
  imports: [],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.less'
})
export class ScoreboardComponent {
  public constructor (public gameService: GameService) {}

}
