import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  template: `

    <style>
      .register-container {
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

    <div class="register-container">
      <h2>Register</h2>
      <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required [(ngModel)]="username">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required [(ngModel)]="password">
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required [(ngModel)]="confirmPassword">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required [(ngModel)]="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address" #emailInput="ngModel">
          @if (emailInput.invalid && emailInput.touched) {
            <div class="error-message">Invalid email format</div> 
          }
        </div>
        <div class="form-group">
          <label for="phone">First Name:</label>
          <input type="text" id="firstName" name="firstName" required [(ngModel)]="firstName">
        </div>
        <div class="form-group">
          <label for="phone">Last Name:</label>
          <input type="text" id="lastName" name="lastName" required [(ngModel)]="lastName">
        </div>
         
        <button type="submit" [disabled]="registerForm.invalid">Register</button>
  `
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';

    async onSubmit() {
    // Sprawdzamy, czy hasła są zgodne
    if (this.password !== this.confirmPassword) {
      console.error('Hasła nie są zgodne!');
      return;
    }

    const registrationData = {
      username: this.username,
      password: this.password,
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
    };

    console.log('Registration submitted:', registrationData);

    try {
      const response = await fetch('http://127.0.0.1:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData), 
      });

      if (!response.ok) {
        throw new Error('Błąd rejestracji. Spróbuj ponownie.');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }
}
