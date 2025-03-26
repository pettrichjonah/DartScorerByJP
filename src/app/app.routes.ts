import { Routes } from '@angular/router';
import { ActivegameComponent } from './activegame/activegame.component';
import { HomeComponent } from './home/home.component';
import { GamefinishedComponent } from './gamefinished/gamefinished.component';
import { StartgameComponent } from './startgame/startgame.component';
import { NavigationGuardService } from './navigationguard.service';

export const routes: Routes = [ 
	{ path: '', component: HomeComponent },
	{ path: 'gameon', component: StartgameComponent },
	{ path: 'play', component: ActivegameComponent, canDeactivate: [NavigationGuardService], canActivate: [NavigationGuardService] },
	{ path: 'wehaveawinner', component: GamefinishedComponent } 
];