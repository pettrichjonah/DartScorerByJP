import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from './game.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationGuardService implements CanDeactivate<CanComponentDeactivate>, CanActivate {

  constructor(private dialog: MatDialog, private router: Router, private gameService: GameService) {}
  
  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  canActivate(): boolean {
    if (this.gameService.currentGame) {
      return true; // Game is running, allow navigation
    } else {
      this.router.navigate(['']);
      return false; // Block access
    }
  }
}
