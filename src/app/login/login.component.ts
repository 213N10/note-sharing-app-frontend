import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <style>
      .login-container {
        max-width: 400px;
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
      .error-message {
        color: red;
        font-size: 12px;
      }
      </style>
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" name="email" required [(ngModel)]="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address" #emailInput="ngModel">
          @if (emailInput.invalid && emailInput.touched) {
            <div class="error-message">Invalid email format</div>
          }
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required [(ngModel)]="password">
        </div>
        <button type="submit" [disabled]="loginForm.invalid">Login</button>
      </form>
    </div>
  `
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async onSubmit() {
    console.log('Login form submitted', this.email, this.password);
    const loginData = {
      email: this.email,
      password: this.password,
    };

    console.log('Login form submitted:', loginData);

    try {
      const response = await fetch('http://127.0.0.1:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), 
      });

      if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log(data);
      } else {
          console.log("Brak treści JSON (np. 204 No Content)");
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    
    
  
}

}

