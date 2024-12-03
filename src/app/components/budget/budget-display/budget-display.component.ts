import { Component, computed, effect, OnInit, Signal } from '@angular/core';
import { ExpenseService } from '../../../shared/expense.service';
import { Budget } from '../../../interface/budget';
import { BudgetService } from '../../../shared/budget.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-budget-display',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './budget-display.component.html',
  styleUrl: './budget-display.component.scss',
})
export class BudgetDisplayComponent implements OnInit {
  totalAmount!: number;
  budgetForm!: FormGroup;
  balance!: Signal<number>;
  myBudget!: Budget[];
  budget!: number;
  faPen = faPen;
  constructor(
    private expenses: ExpenseService,
    private budgetService: BudgetService,
    private router: Router
  ) {
    effect(() => {
      this.totalAmount = expenses.totalexpense();
    });
    this.getAmount();
    this.Budgetbalance();
    this.budgetForm = budgetService.budgetForm;
  }
  ngOnInit(): void {
    this.Budgetbalance();
  }

  getAmount() {
    this.budgetService.getBudget().subscribe(
      (res) => {
        this.myBudget = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          let myamount = data.amount;
          let myid = data.id;
          this.budgetService.budgetId.set(myid);

          this.budgetService.myBudget.set(myamount);
          this.budget = this.budgetService.myBudget();

          return data.amount;
        });
      },
      (err) => {
        alert(err.message);
      }
    );
  }
  Budgetbalance() {
    this.balance = computed(
      () => this.budgetService.myBudget() - this.expenses.totalexpense()
    );
  }
  EditBudgetAmount(amount: number) {
    this.budgetService.isEdit.set(true);
    this.budgetForm.patchValue({
      amount: amount,
    });
    this.router.navigate(['/budget-form']);
  }
}
