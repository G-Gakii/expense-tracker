import { Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogging = signal(false);
  isregister = signal(false);
  loggingErrMsg = signal('');

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {}
  async registerUser(email: string, password: string) {
    this.isregister.set(true);
    try {
      const res = await this.fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (res.user) {
        alert('Registered Successfully. Kindly verify your email to login');

        const sendEmailVerificationPromise = this.sendEmailVerification(
          res.user
        );
        const userRef = this.afs.collection('users').doc(res.user.uid);
        const updateUser = userRef.set(
          {
            email: email,
            isOwner: true,
          },
          { merge: true }
        );
        const navigatePromise = this.router.navigate(['login']);
        await Promise.all([
          sendEmailVerificationPromise,
          updateUser,
          navigatePromise,
        ]);
      }
    } catch (error: any) {
      alert(error.message);
      this.router.navigate(['/register']);
    } finally {
      this.isregister.set(false);
    }
  }

  async logInUser(email: string, password: string) {
    this.isLogging.set(true);
    try {
      const res = await this.fireAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (res.user) {
        localStorage.setItem('token', 'true');
        if (res.user.emailVerified) {
          const userRef = this.afs.collection('users').doc(res.user.uid);
          const updatePromise = userRef.set(
            { email: email, isOwner: true },
            { merge: true }
          );
          const navigatePromise = this.router.navigate(['/expense']);
          await Promise.all([updatePromise, navigatePromise]);
        } else {
          alert('Please verify your email first');
          return;
        }
      }
    } catch (error: any) {
      this.loggingErrMsg.set('Invalid credentials');
    } finally {
      this.isLogging.set(false);
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
