import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../shared/expense.service';
import { Expense } from '../../../interface/expense';
import { Router, RouterLink } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expense-display',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './expense-display.component.html',
  styleUrl: './expense-display.component.scss',
})
export class ExpenseDisplayComponent implements OnInit {
  expenses: Expense[] = [];
  expenseForm!: FormGroup;
  totalAmount: number = 1;

  constructor(private expenseService: ExpenseService, private router: Router) {}
  ngOnInit(): void {
    this.getUserExpenses();
    this.expenseForm = this.expenseService.expenseForm;
  }

  getUserExpenses() {
    this.expenseService.getALLExpenses().subscribe(
      (res) => {
        this.expenses = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        this.totalExpense();
      },
      (err) => {
        alert(err.message);
      }
    );
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
    this.router.navigate(['/expense-form']);
  }
  totalExpense() {
    this.totalAmount = this.expenses.reduce((total, expense) => {
      const amount = expense.amount || 0;
      return total + amount;
    }, 0);
  }
}
