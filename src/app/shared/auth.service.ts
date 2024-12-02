import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {}
  registerUser(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user) {
          alert('Registered Successfully. Kindly verify your email');
          this.sendEmailVerification(res.user);
          this.afs
            .collection('users')
            .doc(res.user.uid)
            .set({
              email: email,
              isOwner: true,
            })
            .then(() => {
              this.router.navigate(['login']);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.error('User does not contain user infomation');
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  logInUser(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user) {
          localStorage.setItem('token', 'true');
          if (res.user.emailVerified) {
            this.afs
              .collection('users')
              .doc(res.user.uid)
              .set({
                email: email,
                isOwner: true,
              })
              .then(() => {
                this.router.navigate(['/expense-display']);
              });
          }
        } else {
          alert('kindly verify your email');
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  googleSignIn() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then(
      async (res) => {
        if (res.user) {
          const user = res.user;
          const UserRef = this.afs.collection('users').doc(user.uid);
          UserRef.get().subscribe((doc) => {
            if (!doc.exists) {
              UserRef.set({
                // Ensure this is awaited as well
                email: user.email,
                isOwner: true,
              });
            }
            this.router.navigate(['/expense display']);
            localStorage.setItem('token', JSON.stringify(user.uid));
          });
        }
      },

      (err) => {
        alert(`error signing in with google: ${err}`);
      }
    );
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
}
