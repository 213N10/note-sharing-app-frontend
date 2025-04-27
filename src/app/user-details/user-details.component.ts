import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-details',
  imports: [],
  template: `
    @if (isLoggedIn) {
    <div class="user-details-container">
      <h2>User Details</h2>
      <div class="user-details">
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Name:</strong> {{ user.first_name }} {{ user.last_name }}</p>
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Status:</strong> {{ user.user_status }}</p>
        <p><strong>Roles</strong> {{ user.roles }}</p>
      </div>  

      <div class="user-actions">
        <button (click)="editUser('blocked')">Block</button>
        <button (click)="editUser('banned')">Ban</button>
        <button (click)="deleteUser()">Delete</button>
      </div>
    </div>
    } @else {
      <p>You must be logged in to view user details.</p>
    }
  
`,
  styles: [`
    .user-details-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    .user-details {
      margin-bottom: 20px;
    }
    .user-actions button {
      margin-right: 10px;
    }
  `]
})
export class UserDetailsComponent {
  user: any = {}; 
  userId: string = '0'; 
  isLoggedIn: boolean = false; 

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.userId = String(this.route.snapshot.paramMap.get('id'));
    console.log(this.userId);
    this.fetchUserDetails(this.userId);
  }
  ngOnInit() {
    // Subskrybujemy stan logowania
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  async fetchUserDetails(userId: string) {
    try {
      const response = await fetch(`http://127.0.0.1:8080/users/${this.userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      this.user = await response.json();
      console.log('Fetched user:', this.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  async editUser(status: string) {
  console.log('Edit user clicked:', this.userId);

  try {
    const response = await fetch(`http://127.0.1:8080/users/block/${this.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_status: status }),
    });

    if (!response.ok) {
      throw new Error('Failed to edit user status');
    }

    const updatedUser = await response.json();
    console.log('User status updated:', updatedUser);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  }
  
  async deleteUser() {
  try {
    const response = await fetch(`http://127.0.0.1:8080/users/${this.userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    console.log(`User with ID ${this.userId} has been deleted`);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
}
