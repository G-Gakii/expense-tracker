import { Component } from '@angular/core';
import { ExpenseDisplayComponent } from '../expense-display/expense-display.component';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { BudgetDisplayComponent } from '../../budget/budget-display/budget-display.component';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-main-expense',
  standalone: true,
  imports: [
    ExpenseDisplayComponent,
    ExpenseFormComponent,
    BudgetDisplayComponent,
  ],
  templateUrl: './main-expense.component.html',
  styleUrl: './main-expense.component.scss',
})
export class MainExpenseComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
