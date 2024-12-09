import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ExpenseDisplayComponent } from './components/expense/expense-display/expense-display.component';
import { ExpenseFormComponent } from './components/expense/expense-form/expense-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MainExpenseComponent } from './components/expense/main-expense/main-expense.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },

  {
    path: 'expense',
    loadComponent: () =>
      import('./components/expense/main-expense/main-expense.component').then(
        (c) => c.MainExpenseComponent
      ),
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/forgot-password/forgot-password.component').then(
        (c) => c.ForgotPasswordComponent
      ),
  },
  {
    path: 'budget-form',
    loadComponent: () =>
      import('./components/budget/budget/budget.component').then(
        (c) => c.BudgetComponent
      ),
  },

  {
    path: 'mychart',
    loadComponent: () =>
      import('./components/chart/mychart/mychart.component').then(
        (c) => c.MychartComponent
      ),
  },
];
