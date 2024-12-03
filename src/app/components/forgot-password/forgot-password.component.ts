import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email!: string;
  constructor(private authService: AuthService) {}
  forgotPassword() {
    if (this.email) {
      this.authService.forgotPassword(this.email);
    }
  }
}
