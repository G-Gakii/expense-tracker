import { Component, effect, signal } from '@angular/core';
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
  isLogging!: boolean;
  errorMsg = '';
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
    effect(() => {
      this.isLogging = auth.isLogging();
      this.errorMsg = auth.loggingErrMsg();
    });
  }
  login() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();

      return;
    }
    const email = this.userForm.get('email')?.value;
    const password = this.userForm.get('password')?.value;

    this.auth.logInUser(email, password);
  }
}
