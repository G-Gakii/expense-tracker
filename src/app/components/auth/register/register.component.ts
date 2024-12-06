import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userForm!: FormGroup;
  registerUser = false;

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

  register() {
    this.registerUser = true;
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.registerUser = false;
      return;
    }
    const email = this.userForm.get('email')?.value;
    const password = this.userForm.get('password')?.value;

    this.auth.registerUser(email, password);
    this.registerUser = false;
  }
}
