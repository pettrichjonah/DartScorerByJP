import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  
  constructor(private router: Router) { } 

  public goToStartGamePage() {
    this.router.navigate(['/gameon'])
  }
}
