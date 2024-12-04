import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userForm!: FormGroup;
  isLogging = signal(false);

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.userForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ],
      ],
    });
  }
  login() {
    console.log(this.isLogging());

    this.isLogging.set(true);
    console.log(this.isLogging());

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.isLogging.set(false);
      return;
    }
    const email = this.userForm.get('email')?.value;
    const password = this.userForm.get('password')?.value;

    this.auth.logInUser(email, password);
    this.isLogging.set(false);
    console.log(this.isLogging());
  }
}
