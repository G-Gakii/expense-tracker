import { Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Budget } from '../interface/budget';
import { EMPTY, firstValueFrom, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  budgetForm!: FormGroup;
  budgetId = signal('');

  myBudget = signal(0);
  isEdit = signal(false);
  addingBudget = signal(false);
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

  async AddBudget(budget: Budget) {
    try {
      this.addingBudget.set(true);
      const user = await firstValueFrom(this.fireAuth.authState.pipe(take(1)));
      if (user) {
        const budgetquery = this.afs
          .collection('budget', (ref) => ref.where('owner', '==', user.uid))
          .get();
        const budgetRef = await firstValueFrom(budgetquery);
        if (budgetRef.empty) {
          budget.owner = user.uid;
          budget.id = this.afs.createId();
          await Promise.all([
            this.afs.collection('budget').add(budget),
            this.router.navigate(['/expense']),
          ]);
        } else {
          alert('you already have a budget');
        }
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      this.addingBudget.set(false);
    }
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
