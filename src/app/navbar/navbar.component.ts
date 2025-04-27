import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone : true,
  template: `
    <style>
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

    </style>

  ` 
})
export class NavbarComponent {
  isLoggedIn = true;

  /*constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
  }
  */
  logout() {
    //this.authService.logout();
    console.log('Logout clicked');
    if (this.isLoggedIn) {
      this.isLoggedIn = false;

    } else {
    
    }
  }

}
