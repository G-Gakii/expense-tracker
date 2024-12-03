import { Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Budget } from '../interface/budget';
import { EMPTY, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  budgetForm!: FormGroup;
  budgetId = signal('');
  // = new FormGroup({
  //   amount: new FormControl([Validators.required, Validators.min(0)]),
  // });
  myBudget = signal(0);
  isEdit = signal(false);
  constructor(
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.budgetForm = this.fb.group({
      amount: [[Validators.required, Validators.min(0)]],
    });
  }

  AddBudget(budget: Budget) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.afs
          .collection('budget', (ref) => ref.where('owner', '==', user.uid))
          .snapshotChanges()
          .pipe(take(1))
          .subscribe((existingBudget) => {
            if (existingBudget.length === 0) {
              budget.owner = user.uid;
              budget.id = this.afs.createId();
              this.afs
                .collection('budget')
                .add(budget)
                .then(
                  () => {
                    alert('Amount added successfully');
                    this.router.navigate(['/expense']);
                  },
                  (err) => {
                    alert(err.message);
                  }
                );
            } else {
              alert('you already have a budget');
            }
          });
      }
    });
  }
  getBudget() {
    return this.fireAuth.authState.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection('budget', (ref) => ref.where('owner', '==', user.uid))
            .snapshotChanges();
        } else {
          return EMPTY;
        }
      })
    );
  }
  updateBudget(budgetid: string, updateBudget: Budget) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.afs
          .collection('budget')
          .doc(budgetid)
          .update(updateBudget)
          .then(
            () => {
              alert('updated successfully');
              this.router.navigate(['/expense']);
            },
            (err) => {
              alert(err.message);
            }
          );
      }
    });
  }
}
