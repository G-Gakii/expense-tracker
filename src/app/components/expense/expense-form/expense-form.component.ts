import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseService } from '../../../shared/expense.service';
import { Expense } from '../../../interface/expense';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss',
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;
  isEdit!: boolean;
  myId!: string;

  constructor(private expense: ExpenseService) {}
  ngOnInit(): void {
    this.expenseForm = this.expense.expenseForm;
    this.isEdit = this.expense.isEdit();
    this.myId = this.expense.toUpdateExpenseId();
  }

  AddExpense() {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
    } else {
      let myexpense: Expense = this.expenseForm.value;
      if (this.isEdit) {
        this.expense.updateExpense(this.myId, myexpense);
      } else {
        this.expense.addExpense(myexpense);
      }
      this.expenseForm.reset();
      this.expense.isEdit.set(false);
    }
  }
}
