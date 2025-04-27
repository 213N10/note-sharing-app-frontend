import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // BehaviorSubject przechowuje stan logowania: true/false
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable(); // Observable dla komponentów do subskrypcji

  // BehaviorSubject przechowuje dane użytkownika, jeśli jest zalogowany
  private userSubject = new BehaviorSubject<any>(null); 
  user$ = this.userSubject.asObservable(); // Observable dla komponentów do subskrypcji

  constructor() {}

  // Metoda do ustawienia stanu logowania i zapisania danych użytkownika
  login(user: any) {
    this.userSubject.next(user); // Ustawiamy dane użytkownika
    this.loggedInSubject.next(true);
    console.log(this.isLoggedIn(), this.getUser()) // Ustawiamy, że użytkownik jest zalogowany
  }

  // Metoda do wylogowania
  logout() {
    this.userSubject.next(null); // Usuwamy dane użytkownika
    this.loggedInSubject.next(false); // Ustawiamy, że użytkownik nie jest zalogowany
  }

  // Metoda do pobrania aktualnych danych użytkownika
  getUser() {
    return this.userSubject.getValue();
  }

  // Metoda do sprawdzenia, czy użytkownik jest zalogowany
  isLoggedIn() {
    return this.loggedInSubject.getValue();
  }
}
