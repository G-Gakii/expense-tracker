import { Component, effect, viewChild } from '@angular/core';
import { BudgetService } from '../../../shared/budget.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Budget } from '../../../interface/budget';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
  budgetForm!: FormGroup;
  isEdit!: boolean;
  myId!: string;
  adding!: boolean;

  constructor(private budgetService: BudgetService) {
    this.budgetForm = budgetService.budgetForm;
    this.isEdit = budgetService.isEdit();
    this.myId = budgetService.budgetId();
    effect(() => {
      this.adding = budgetService.addingBudget();
    });
  }

  addBudgetAmount() {
    if (this.budgetForm.invalid) {
      this.budgetForm.markAllAsTouched();
      return;
    } else {
      let myBudget: Budget = this.budgetForm.value;
      if (this.isEdit) {
        this.budgetService.updateBudget(this.myId, myBudget);
      } else {
        this.budgetService.AddBudget(myBudget);
      }
      this.budgetService.isEdit.set(false);
    }
  }
}
