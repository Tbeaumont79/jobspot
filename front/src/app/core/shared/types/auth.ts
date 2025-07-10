import { Observable } from 'rxjs';
import { User } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
export interface IAuthStateService {
  login(credentials: LoginCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  getCurrentUser(): Observable<User | null>;
}

export interface ITokenService {
  hasValidToken(): boolean;
  clearToken(): void;
}
