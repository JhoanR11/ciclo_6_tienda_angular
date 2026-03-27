import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="brand-logo">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="#2563EB"/>
                <path d="M6 10h16M6 14h10M6 18h13" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Tech<span>Store</span></span>
            </div>
            <p>Tu tienda de tecnología de confianza. Los mejores productos al mejor precio.</p>
            <div class="social-links">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">in</a>
              <a href="#" aria-label="Twitter">tw</a>
            </div>
          </div>

          <!-- Links -->
          <div class="footer-col">
            <h4>Tienda</h4>
            <ul>
              <li><a routerLink="/productos">Todos los productos</a></li>
              <li><a routerLink="/productos">Laptops</a></li>
              <li><a routerLink="/productos">Smartphones</a></li>
              <li><a routerLink="/productos">Accesorios</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Ayuda</h4>
            <ul>
              <li><a href="#">Envíos</a></li>
              <li><a href="#">Devoluciones</a></li>
              <li><a href="#">Garantía</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="footer-col">
            <h4>Newsletter</h4>
            <p style="font-size:0.85rem;color:#9ca3af;margin-bottom:12px;">Recibe ofertas exclusivas en tu correo.</p>
            <div class="newsletter">
              <input type="email" placeholder="tu@email.com" />
              <button>→</button>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2025 TechStore. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para SENATI</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1F2937; color: #d1d5db;
      margin-top: 80px;
    }
    .footer-container { max-width: 1200px; margin: 0 auto; padding: 48px 24px 24px; }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
      gap: 40px; margin-bottom: 40px;
    }
    .brand-logo {
      display: flex; align-items: center; gap: 8px;
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1.1rem; color: white; margin-bottom: 12px;
    }
    .brand-logo span span { color: #2563EB; }
    .footer-brand p {
      font-family: 'Inter', sans-serif; font-size: 0.875rem;
      color: #9ca3af; line-height: 1.6;
    }
    .social-links { display: flex; gap: 8px; margin-top: 16px; }
    .social-links a {
      width: 34px; height: 34px; border-radius: 8px;
      background: #374151; color: #d1d5db;
      display: flex; align-items: center; justify-content: center;
      text-decoration: none; font-size: 0.8rem; font-weight: 700;
      transition: background 0.2s;
    }
    .social-links a:hover { background: #2563EB; color: white; }
    .footer-col h4 {
      font-family: 'Poppins', sans-serif; font-weight: 600;
      color: white; margin-bottom: 16px; font-size: 0.95rem;
    }
    .footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
    .footer-col ul a {
      text-decoration: none; color: #9ca3af;
      font-family: 'Inter', sans-serif; font-size: 0.875rem;
      transition: color 0.2s;
    }
    .footer-col ul a:hover { color: #2563EB; }
    .newsletter { display: flex; gap: 0; }
    .newsletter input {
      flex: 1; padding: 10px 12px;
      background: #374151; border: 1px solid #4b5563;
      border-right: none; border-radius: 8px 0 0 8px;
      color: white; font-family: 'Inter', sans-serif; font-size: 0.875rem;
      outline: none;
    }
    .newsletter button {
      padding: 10px 14px; background: #2563EB;
      color: white; border: none;
      border-radius: 0 8px 8px 0; cursor: pointer;
      font-size: 1rem; transition: background 0.2s;
    }
    .newsletter button:hover { background: #1E3A8A; }
    .footer-bottom {
      border-top: 1px solid #374151; padding-top: 24px;
      display: flex; justify-content: space-between;
      font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #6b7280;
    }
    @media (max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 480px) {
      .footer-grid { grid-template-columns: 1fr; }
      .footer-bottom { flex-direction: column; gap: 8px; }
    }
  `]
})
export class FooterComponent {}
