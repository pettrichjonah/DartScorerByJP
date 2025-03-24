import { Pipe, PipeTransform } from '@angular/core';
import { Shot } from './models/shot';
import { Multiplicator } from './models/game';

@Pipe({
  name: 'recentShots'
})
export class RecentShotsPipe implements PipeTransform {

  transform(shot: Shot | undefined): string | null {
    if (!shot)
      return null;

    return this.getShorthandForMultiplicator(shot) + "" + shot.score;
  }

  private getShorthandForMultiplicator(shot: Shot): string {
    switch(shot.multiplicator) { 
      case Multiplicator.Double:
         return "D"
      case Multiplicator.Triple:
         return "T"
      default:
        if (shot.score === 50 || shot.score === 25 || shot.score === 0)
          return "";
        
        return "S";
   }  
  }
}
