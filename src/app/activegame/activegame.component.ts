import { Component } from '@angular/core';
import { ScorepadComponent } from "../scorepad/scorepad.component";
import { ScoreboardComponent } from "../scoreboard/scoreboard.component";
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../navigationguard.service';
import { ConfirmationDialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { GameService } from '../game.service';

@Component({
  selector: 'app-activegame',
  imports: [ScorepadComponent, ScoreboardComponent],
  templateUrl: './activegame.component.html',
  styleUrl: './activegame.component.less'
})
export class ActivegameComponent implements CanComponentDeactivate {
  constructor(private dialog: MatDialog, private gameService: GameService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.gameService.currentGame) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '300px',
        height: '250px',
        data: { message: 'You are in an active game. Do you really want to leave?' }
      });
  
      return dialogRef.afterClosed();
    }

    return true;
  }
}
