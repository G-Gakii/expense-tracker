import { Component, effect, OnInit, signal } from '@angular/core';
import { ExpenseService } from '../../../shared/expense.service';
import { Expense } from '../../../interface/expense';
import { Router, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expense-display',
  standalone: true,
  imports: [],
  templateUrl: './expense-display.component.html',
  styleUrl: './expense-display.component.scss',
})
export class ExpenseDisplayComponent implements OnInit {
  expenses: Expense[] = [];
  length = 0;

  expenseForm!: FormGroup;
  totalAmount: number = 1;

  constructor(private expenseService: ExpenseService, private router: Router) {
    this.expenseService.getUserExpenses();
    effect(() => {
      this.expenses = this.expenseService.myExpense();

      this.length = this.expenses.length;
    });
  }
  ngOnInit(): void {
    this.expenseForm = this.expenseService.expenseForm;
  }

  deleteExpense(expense: Expense) {
    if (
      window.confirm(
        `Are you sure you want to delete expense :${expense.category}-${expense.description} `
      )
    ) {
      this.expenseService.deleteExpense(expense);
    }
  }

  EditExpense(expense: Expense) {
    this.expenseService.isEdit.set(true);

    this.expenseService.toUpdateExpenseId.set(expense.id);
    this.expenseForm.patchValue({
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
    });
  }
}
