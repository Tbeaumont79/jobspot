import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

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

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue: LoginForm = this.loginForm.value;
      console.log('Form submitted:', formValue);
      // TODO: Implement authentication logic
      this.handleSuccessfulLogin(formValue);
    } else {
      console.warn('Form is invalid');
      this.markAllFieldsAsTouched();
    }
  }

  private handleSuccessfulLogin(credentials: LoginForm): void {
    console.log('Processing login for:', credentials.email);
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

    if (field && field.errors && (field.touched || field.dirty)) {
      if (field.errors['required']) {
        return fieldName === 'email'
          ? "L'email est requis."
          : 'Le mot de passe est requis.';
      }
      if (field.errors['email']) {
        return 'Veuillez entrer une adresse email valide.';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Le mot de passe doit contenir au moins ${requiredLength} caractères.`;
      }
    }

    return null;
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.touched || field?.dirty));
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && (field?.touched || field?.dirty));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.valid && (field?.touched || field?.dirty));
  }
}
