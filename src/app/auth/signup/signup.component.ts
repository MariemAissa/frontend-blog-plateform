// signup.component.ts
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  passwordStrength = signal<string>('Weak');
  errorMessage = '';
  successMessage = '';
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl(['lecteur', Validators.required]) // Par défaut lecteur, laisser choix libre si besoin

  });
  constructor(private authService: AuthService) {}


  calculateStrength() {
    const password = this.authForm.value.password || '';
    // Add your password strength logic
    this.passwordStrength.set('Strong'); // Simplified for example
  }

  onSubmit() {
    if (this.authForm.valid) {
      console.log('Form submitted', this.authForm.value);
    }

    this.authService.signup(this.authForm.value).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie ! Vous pouvez vous connecter.';
        this.errorMessage = '';
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue.';
        this.successMessage = '';
      }
    });
  }
}
