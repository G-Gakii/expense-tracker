import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userForm!: FormGroup;

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
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const email = this.userForm.get('email')?.value;
    const password = this.userForm.get('password')?.value;

    this.auth.logInUser(email, password);
  }
}
