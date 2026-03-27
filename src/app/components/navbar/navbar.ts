import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <!-- Logo -->
        <a routerLink="/" class="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#2563EB"/>
            <path d="M6 10h16M6 14h10M6 18h13" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="logo-text">Tech<span class="logo-accent">Store</span></span>
        </a>

        <!-- Nav links -->
        <ul class="navbar-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Inicio</a></li>
          <li><a routerLink="/productos" routerLinkActive="active">Productos</a></li>
          @if (authService.isAdmin()) {
            <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
          }
        </ul>

        <!-- Search -->
        <div class="navbar-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Buscar productos..." (input)="onSearch($event)" />
        </div>

        <!-- Actions -->
        <div class="navbar-actions">
          <!-- Cart -->
          <a routerLink="/carrito" class="cart-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            @if (cartService.totalItems() > 0) {
              <span class="cart-badge">{{ cartService.totalItems() }}</span>
            }
          </a>

          <!-- User -->
          @if (authService.isLoggedIn()) {
            <div class="user-avatar" (click)="authService.logout()">
              {{ authService.getUserInitials() }}
            </div>
          } @else {
            <button class="btn-login" (click)="toggleLogin()">Ingresar</button>
          }
        </div>

        <!-- Mobile toggle -->
        <button class="mobile-toggle" (click)="mobileOpen.set(!mobileOpen())">
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile menu -->
      @if (mobileOpen()) {
        <div class="mobile-menu">
          <a routerLink="/" (click)="mobileOpen.set(false)">Inicio</a>
          <a routerLink="/productos" (click)="mobileOpen.set(false)">Productos</a>
          <a routerLink="/carrito" (click)="mobileOpen.set(false)">Carrito ({{ cartService.totalItems() }})</a>
        </div>
      }
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      box-shadow: 0 1px 8px rgba(0,0,0,0.06);
    }
    .navbar-container {
      max-width: 1200px; margin: 0 auto;
      padding: 0 24px;
      display: flex; align-items: center; gap: 24px;
      height: 68px;
    }
    .navbar-logo {
      display: flex; align-items: center; gap: 10px;
      text-decoration: none; flex-shrink: 0;
    }
    .logo-text {
      font-family: 'Poppins', sans-serif;
      font-weight: 700; font-size: 1.2rem;
      color: #1F2937;
    }
    .logo-accent { color: #2563EB; }
    .navbar-links {
      display: flex; list-style: none; gap: 4px;
      margin: 0; padding: 0;
    }
    .navbar-links a {
      text-decoration: none; color: #4b5563;
      font-family: 'Inter', sans-serif; font-size: 0.9rem;
      padding: 6px 14px; border-radius: 8px;
      transition: all 0.2s;
    }
    .navbar-links a:hover, .navbar-links a.active {
      background: #eff6ff; color: #2563EB; font-weight: 500;
    }
    .navbar-search {
      flex: 1; max-width: 320px;
      display: flex; align-items: center; gap: 8px;
      background: #F8FAFC; border: 1px solid #e5e7eb;
      border-radius: 10px; padding: 8px 14px;
      color: #9ca3af;
    }
    .navbar-search input {
      border: none; background: transparent; outline: none;
      font-family: 'Inter', sans-serif; font-size: 0.875rem;
      color: #1F2937; width: 100%;
    }
    .navbar-search input::placeholder { color: #9ca3af; }
    .navbar-actions {
      display: flex; align-items: center; gap: 12px;
      margin-left: auto;
    }
    .cart-btn {
      position: relative; display: flex; align-items: center;
      color: #1F2937; text-decoration: none;
      padding: 8px; border-radius: 10px;
      transition: background 0.2s;
    }
    .cart-btn:hover { background: #F8FAFC; }
    .cart-badge {
      position: absolute; top: 2px; right: 2px;
      background: #2563EB; color: white;
      font-size: 0.65rem; font-weight: 700;
      width: 16px; height: 16px;
      border-radius: 50%; display: flex;
      align-items: center; justify-content: center;
    }
    .user-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: #2563EB; color: white;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.8rem;
      cursor: pointer; transition: opacity 0.2s;
    }
    .user-avatar:hover { opacity: 0.85; }
    .btn-login {
      background: #2563EB; color: white;
      border: none; border-radius: 8px;
      padding: 8px 18px; cursor: pointer;
      font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 500;
      transition: background 0.2s;
    }
    .btn-login:hover { background: #1E3A8A; }
    .mobile-toggle {
      display: none; flex-direction: column; gap: 5px;
      background: none; border: none; cursor: pointer; padding: 4px;
    }
    .mobile-toggle span {
      display: block; width: 22px; height: 2px;
      background: #1F2937; border-radius: 2px;
    }
    .mobile-menu {
      display: flex; flex-direction: column;
      background: white; border-top: 1px solid #e5e7eb;
      padding: 12px 24px;
    }
    .mobile-menu a {
      text-decoration: none; color: #1F2937;
      font-family: 'Inter', sans-serif; padding: 10px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    @media (max-width: 768px) {
      .navbar-links, .navbar-search { display: none; }
      .mobile-toggle { display: flex; }
    }
  `]
})
export class NavbarComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  mobileOpen = signal(false);

  onSearch(event: Event): void {
    // Search logic handled in productos page
  }

  toggleLogin(): void {
    // Mock login for demo
    this.authService.login('juan@email.com', 'password123');
  }
}
