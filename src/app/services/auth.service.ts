import { Injectable, signal, computed } from '@angular/core';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  avatar?: string;
}

// PRINCIPIO S (SOLID) — solo maneja autenticación
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser = signal<IUser | null>(null);
  private _isLoading = signal(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isLoggedIn = computed(() => this._currentUser() !== null);
  readonly isAdmin = computed(() => this._currentUser()?.role === 'admin');

  login(email: string, password: string): boolean {
    this._isLoading.set(true);
    // Mock login — en producción se conectaría a una API
    const mockUsers: IUser[] = [
      { id: 1, name: 'Admin TechStore', email: 'admin@techstore.com', role: 'admin' },
      { id: 2, name: 'Juan Pérez', email: 'juan@email.com', role: 'customer' }
    ];

    const user = mockUsers.find(u => u.email === email);
    if (user && password.length >= 6) {
      this._currentUser.set(user);
      this._isLoading.set(false);
      return true;
    }

    this._isLoading.set(false);
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
  }

  getUserInitials(): string {
    const name = this._currentUser()?.name ?? '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
