import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  imports: [FormsModule, RouterModule],
  standalone: true,
  template: `
    <style>
      .user-search-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
      }
      .form-group {
        margin-bottom: 15px;
      }
      .form-group label {
        display: block;
        margin-bottom: 5px;
      }
      .form-group input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
      }
      button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      .user-list {
        margin-top: 20px;
      }
      .user-list ul {
        list-style-type: none;
        padding: 0;
      }
      </style>

    @if (isLoggedIn) {
    <div class="user-search-container">
      <h2>User Search</h2>
      <form (ngSubmit)="onSubmit()" #userSearchForm="ngForm">
        <div class="form-group">
          <label for="searchQuery">Search Users:</label>
          <input type="text" id="searchQuery" name="searchQuery" required [(ngModel)]="searchQuery">
        </div>
        <button type="submit">Search</button>
      </form>
      @if (users.length > 0) {
      <div class="user-list">
        <h3>Results:</h3>
        <ul>
          @for (user of users; track user.id) {
            <li>
              <strong>{{ user.username }}</strong> ({{ user.email }})<br>
              Name: {{ user.first_name }} {{ user.last_name }}<br>
              id: {{ user.id }}<br>
              <a [routerLink]="['/users', user.id]" routerLinkActive="active" ariaCurrentWhenActive="page">Details</a> 
            </li>
          }
          
        </ul>
      </div>
      }
      @if (users.length === 0 && searchDone) {
        <div class="no-results">
          <p>No users found.</p>
        </div>
      }
    </div>
  }
  `
})
export class UserSearchComponent {
  searchQuery: string = '';
  users: any[] = []; // Typ użytkowników, który otrzymasz z API
  searchDone: boolean = false;
  isLoggedIn: boolean = false; // Stan logowania

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subskrybujemy stan logowania
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  async onSubmit() {
    // Handle the search query submission
    console.log('Search query submitted:', this.searchQuery);
    //if (!this.searchQuery.trim()) return;

    try {
      const response = await fetch(`http://127.0.0.1:8080/users/search?query=${encodeURIComponent(this.searchQuery)}&offset=0&limit=10`);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      this.users = data; // Załóżmy, że API zwraca tablicę użytkowników
      
    } catch (error) {
      console.error('Error fetching users:', error);
      this.users = [];
    } finally {
      
      this.searchDone = true;
    }
  }
}
      
