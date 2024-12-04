import { Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/compat/firestore';
import { Expense } from '../interface/expense';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  myExpense = signal<Expense[]>([]);
  expenses: Expense[] = [];
  isEdit = signal(false);
  expenseForm!: FormGroup;
  toUpdateExpenseId = signal('');
  totalexpense = signal(0);
  private $categoryWithTotalAmount = new BehaviorSubject({});
  constructor(
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.expenseForm = fb.group({
      amount: ['', [Validators.required]],
      category: ['Category', Validators.required],
      description: [''],
    });
  }

  getALLExpenses() {
    return this.fireAuth.authState.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection('expenses', (ref) => ref.where('owner', '==', user.uid))
            .snapshotChanges();
        } else {
          return of([]);
        }
      })
    );
  }

  getUserExpenses() {
    this.getALLExpenses().subscribe(
      (res) => {
        this.expenses = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          return data;
        });
        this.myExpense.set(this.expenses);
        this.totalExpense();
        this.totalExpensePerCategory();
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  private totalExpense() {
    const totalAmount = this.expenses.reduce((total, expense) => {
      const amount = expense.amount || 0;
      return total + amount;
    }, 0);
    this.totalexpense.set(totalAmount);
  }

  private totalExpensePerCategory() {
    const categoryTotals: { [key: string]: number } = {};

    this.expenses.forEach((expense) => {
      if (expense.category && expense.amount) {
        if (!categoryTotals[expense.category]) {
          categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
      }
      this.updateTotalExpensePerCategory(categoryTotals);
    });
  }

  addExpense(expense: Expense) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        expense.owner = user.uid;
        expense.id = this.afs.createId();
        this.afs
          .collection('expenses')
          .add(expense)
          .then(
            () => {
              this.router.navigate(['/expense-display']);
              // alert('Expense added successfully');
            },
            (err) => {
              alert(err.message);
            }
          );
      }
    });
  }

  updateExpense(expenseid: string, updatedExpense: Expense) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.afs
          .collection('expenses')
          .doc(expenseid)
          .update(updatedExpense)
          .then(
            () => {
              this.router.navigate(['/expense-display']);
              // alert('expense updated successfully');
            },
            (err) => {
              alert(err.message);
            }
          );
      }
    });
  }
  deleteExpense(expense: Expense) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.afs
          .collection('expenses')
          .doc(expense.id)
          .delete()
          .then(
            () => {
              // alert('Expense deleted successfully');
            },
            (err) => {
              alert(err.message);
            }
          );
      }
    });
  }
  updateTotalExpensePerCategory(categoryTotals: { [key: string]: number }) {
    this.$categoryWithTotalAmount.next(categoryTotals);
  }

  getTotalExpensePerCategory() {
    return this.$categoryWithTotalAmount.asObservable();
  }
}
