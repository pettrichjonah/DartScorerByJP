import { ChangeDetectorRef, Component } from '@angular/core';
import { GameService } from '../game.service';
import { Multiplicator } from '../models/game';
import { Shot } from '../models/shot';
import { RecentShotsPipe } from '../recent-shots.pipe';

@Component({
  selector: 'app-scorepad',
  imports: [RecentShotsPipe],
  templateUrl: './scorepad.component.html',
  styleUrl: './scorepad.component.less'
})
export class ScorepadComponent {
  public currentMultiplicator: Multiplicator = Multiplicator.Single;
  public Multiplicator = Multiplicator;
  public constructor (public gameService: GameService) {}

  public handleShot(score: number) {
    if (score === 50 || score === 25) {
      this.currentMultiplicator = 1;
    }

    let shot: Shot = { score: score, multiplicator: this.currentMultiplicator}
    this.gameService.registerShot(shot);

    this.setMultiplicator(1);
  }

  public setMultiplicator(newMultiplicator: number) {
    if (this.currentMultiplicator !== newMultiplicator) {
      this.currentMultiplicator = newMultiplicator;
    }
    else {
      this.currentMultiplicator = Multiplicator.Single;
    }
  }

  public clickNextPlayerButton() {
    this.gameService.nextPlayer();
    this.gameService.nextPlayerIsActivated = false;
  }

  public getButtonLabel(label: number): string{
      switch (this.currentMultiplicator) {
        case 2:
          return `D${label}`;
        case 3:
          return `T${label}`;
        default:
          return `${label}`;
    }    
  }
}
