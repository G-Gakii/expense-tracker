import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ExpenseDisplayComponent } from './components/expense/expense-display/expense-display.component';
import { ExpenseFormComponent } from './components/expense/expense-form/expense-form.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'expense-display',
    component: ExpenseDisplayComponent,
  },
  {
    path: 'expense-form',
    component: ExpenseFormComponent,
  },
];
