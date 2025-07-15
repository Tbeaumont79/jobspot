import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth/authentication';
import { Router } from '@angular/router';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './login.html',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  // Nouvelle propriété pour gérer les erreurs d'authentification
  authError: string | null = null;
  isLoading = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    // Réinitialiser l'erreur d'authentification
    this.authError = null;

    if (this.loginForm.valid) {
      const formValue: LoginForm = this.loginForm.value;
      console.log('Form submitted:', formValue);
      this.handleSuccessfulLogin(formValue);
    } else {
      console.warn('Form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  private handleSuccessfulLogin(credentials: LoginForm): void {
    console.log('Processing login for:', credentials.email);
    this.isLoading = true;

    this.authenticationService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login failed:', error);

        // Gestion des différents types d'erreurs
        if (error.status === 401) {
          this.authError = 'Email ou mot de passe incorrect.';
        } else if (error.status === 422) {
          this.authError =
            'Données invalides. Veuillez vérifier vos informations.';
        } else if (error.status === 0) {
          this.authError =
            'Impossible de se connecter au serveur. Veuillez réessayer.';
        } else {
          this.authError =
            "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";
        }
      },
    });
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  getFieldError(fieldName: string): string | null {
    const field = this.loginForm.get(fieldName);

    // Seulement si le champ a été touché (quitté), pas pendant qu'on tape
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return fieldName === 'email'
          ? "L'email est requis."
          : 'Le mot de passe est requis.';
      }
      if (field.errors['email']) {
        return 'Veuillez entrer une adresse email valide.';
      }
    }

    return null;
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.hasError(errorType) && field?.touched);
  }

  // Correction : ne montrer rouge que si le champ a été quitté
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  // Correction : ne montrer vert que si le champ a été quitté ET est valide
  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.valid && field?.touched && field?.value);
  }
}
