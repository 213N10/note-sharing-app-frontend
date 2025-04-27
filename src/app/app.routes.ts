import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'users-search',
    component: UserSearchComponent,
    title: 'User Search',
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    title: 'User Details',
  }
];
