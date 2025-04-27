import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from './auth.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template:`
  <h1>{{title}}</h1>
      <nav class="navbar">
      <div class="nav-left">
        <a routerLink="/">Report a Violation</a>
      </div>
      <div class="nav-right">
        @if (!isLoggedIn) {
          <a routerLink="/register" routerLinkActive="active" ariaCurrentWhenActive="page">Register</a>
          <a routerLink="/login" routerLinkActive="active" ariaCurrentWhenActive="page">Login</a>   
        } @else {
          <a routerLink="/users-search" routerLinkActive="active" ariaCurrentWhenActive="page">Users search</a>
          <button (click)="logout()">Logout</button>
        }
      </div>
    </nav>
  <router-outlet></router-outlet>

  
  `,
  styles: `
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: #e0e0e0;
    } 
    .nav-left a, .nav-right a, .nav-right button {
      margin: 0 0.5rem;
      text-decoration: none;
      color: black;
      font-weight: bold;
      background: none;
      border: none;
      cursor: pointer;
    }
  `
})
export class AppComponent {
  title = 'Note Sharing App';
  isLoggedIn = false;
  user: any = null 

  constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout(); 
  }
}
