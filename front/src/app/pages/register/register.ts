import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.registerForm.markAllAsTouched();
    }
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get role(): AbstractControl | null {
    return this.registerForm.get('role');
  }

  hasError(fieldName: string, errorType: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field?.hasError(errorType) ?? false;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return (field?.invalid && (field?.touched || field?.dirty)) ?? false;
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return (field?.valid && (field?.touched || field?.dirty)) ?? false;
  }

  getFieldError(fieldName: string): string | null {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors && (field.touched || field.dirty)) {
      if (field.errors['required']) {
        switch (fieldName) {
          case 'email':
            return 'Email est requis';
          case 'role':
            return 'Rôle est requis';
          case 'password':
            return 'Mot de passe est requis';
          default:
            return 'Ce champ est requis';
        }
      }
      if (field.errors['email']) {
        return 'Email invalide';
      }
      if (field.errors['minlength']) {
        return 'Le mot de passe doit contenir au moins 8 caractères';
      }
    }
    return null;
  }
}
