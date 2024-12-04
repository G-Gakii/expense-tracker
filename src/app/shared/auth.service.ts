import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {}
  async registerUser(email: string, password: string) {
    try {
      const res = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (res.user) {
        alert('Registered Successfully. Kindly verify your email');
        await this.sendEmailVerification(res.user);
        await this.afs.collection('users').doc(res.user.uid).set({
          email: email,
          isOwner: true,
        });
        this.router.navigate(['login']);
      }
    } catch (error: any) {
      alert(error.message);
      this.router.navigate(['/register']);
    }
  }

  async logInUser(email: string, password: string) {
    try {
      const res = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (res.user) {
        localStorage.setItem('token', 'true');
        if (res.user.emailVerified) {
          await this.afs.collection('users').doc(res.user.uid).set({
            email: email,
            isOwner: true,
          });
          this.router.navigate(['/expense']);
        } else {
          alert('Please verify your email first');
        }
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  sendEmailVerification(user: any) {
    user.sendEmailVerification().then(
      () => {
        this.router.navigate([]);
      },
      (err: any) => {
        alert(err.message);
      }
    );
  }

  async forgotPassword(email: string) {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
      alert('Link to reset password has been sent to your email');
    } catch (error) {
      alert('Email does not exist');
    }
  }

  logout() {
    this.fireAuth.signOut().then(
      () => {
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
