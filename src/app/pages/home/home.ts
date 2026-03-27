import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-cart/product-cart';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  template: `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <span class="hero-tag">🚀 Tecnología de punta</span>
          <h1 class="hero-title">
            La mejor tech,<br>
            <span class="hero-accent">al mejor precio</span>
          </h1>
          <p class="hero-desc">
            Laptops, smartphones, accesorios y más. Envío gratis en compras mayores a S/ 299.
          </p>
          <div class="hero-actions">
            <a routerLink="/productos" class="btn-primary">Ver productos</a>
            <a routerLink="/productos" class="btn-ghost">Ver ofertas →</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>+500</strong><span>Productos</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><strong>4.9★</strong><span>Valoración</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><strong>24h</strong><span>Entrega</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" alt="MacBook Pro" />
            <div class="hero-card-tag">MacBook Pro M3 — S/ 8,999</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Categorías</h2>
        <div class="categories-grid">
          @for (cat of categories; track cat.name) {
            <a [routerLink]="['/productos']" [queryParams]="{categoria: cat.name}" class="category-card">
              <span class="cat-icon">{{ cat.icon }}</span>
              <span class="cat-name">{{ cat.name }}</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section section-gray">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Productos destacados</h2>
          <a routerLink="/productos" class="see-all">Ver todos →</a>
        </div>
        <div class="products-grid">
          @for (product of productService.featuredProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </div>
    </section>

    <!-- Banner -->
    <section class="banner-section">
      <div class="container">
        <div class="promo-banner">
          <div>
            <h3>Envío gratis</h3>
            <p>En compras mayores a S/ 299 a todo Lima</p>
          </div>
          <div>
            <h3>Garantía 12 meses</h3>
            <p>En todos nuestros productos</p>
          </div>
          <div>
            <h3>Pago seguro</h3>
            <p>Visa, Mastercard, Yape, Plin</p>
          </div>
          <div>
            <h3>Soporte 24/7</h3>
            <p>Atención por WhatsApp y email</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Hero */
    .hero {
      background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #3b82f6 100%);
      color: white; overflow: hidden;
    }
    .hero-container {
      max-width: 1200px; margin: 0 auto; padding: 80px 24px;
      display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
    }
    .hero-tag {
      display: inline-block; background: rgba(255,255,255,0.15);
      padding: 6px 14px; border-radius: 20px;
      font-family: 'Inter', sans-serif; font-size: 0.85rem;
      margin-bottom: 20px; backdrop-filter: blur(4px);
    }
    .hero-title {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 3rem; line-height: 1.15; margin: 0 0 20px;
    }
    .hero-accent { color: #bfdbfe; }
    .hero-desc {
      font-family: 'Inter', sans-serif; font-size: 1.05rem;
      color: rgba(255,255,255,0.85); line-height: 1.6; margin-bottom: 32px;
    }
    .hero-actions { display: flex; gap: 14px; margin-bottom: 40px; }
    .btn-primary {
      background: white; color: #2563EB;
      padding: 12px 28px; border-radius: 10px;
      font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.95rem;
      text-decoration: none; transition: opacity 0.2s;
    }
    .btn-primary:hover { opacity: 0.9; }
    .btn-ghost {
      color: white; border: 2px solid rgba(255,255,255,0.4);
      padding: 12px 28px; border-radius: 10px;
      font-family: 'Inter', sans-serif; font-weight: 500;
      text-decoration: none; transition: border-color 0.2s;
    }
    .btn-ghost:hover { border-color: white; }
    .hero-stats { display: flex; align-items: center; gap: 20px; }
    .stat { display: flex; flex-direction: column; }
    .stat strong { font-family: 'Poppins', sans-serif; font-size: 1.3rem; font-weight: 700; }
    .stat span { font-family: 'Inter', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.7); }
    .stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.3); }
    .hero-visual { display: flex; justify-content: center; }
    .hero-card {
      border-radius: 20px; overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,0,0,0.3);
      position: relative; max-width: 420px;
    }
    .hero-card img { width: 100%; display: block; }
    .hero-card-tag {
      position: absolute; bottom: 16px; left: 16px; right: 16px;
      background: rgba(255,255,255,0.95); color: #1F2937;
      padding: 10px 16px; border-radius: 10px;
      font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.9rem;
    }
    /* Sections */
    .section { padding: 64px 0; }
    .section-gray { background: #F8FAFC; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
    .section-title {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1.75rem; color: #1F2937; margin: 0 0 32px;
    }
    .section-header .section-title { margin: 0; }
    .see-all {
      font-family: 'Inter', sans-serif; color: #2563EB;
      text-decoration: none; font-weight: 500; font-size: 0.9rem;
    }
    .see-all:hover { text-decoration: underline; }
    /* Categories */
    .categories-grid {
      display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px;
    }
    .category-card {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      background: white; border: 1px solid #e5e7eb; border-radius: 14px;
      padding: 20px 12px; text-decoration: none;
      transition: all 0.2s;
    }
    .category-card:hover {
      border-color: #2563EB; background: #eff6ff;
      transform: translateY(-2px);
    }
    .cat-icon { font-size: 1.8rem; }
    .cat-name {
      font-family: 'Inter', sans-serif; font-size: 0.8rem;
      font-weight: 500; color: #1F2937; text-align: center;
    }
    /* Products grid */
    .products-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
    }
    /* Banner */
    .banner-section { padding: 40px 0; }
    .promo-banner {
      background: linear-gradient(135deg, #1E3A8A, #2563EB);
      border-radius: 20px; padding: 40px;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
      color: white;
    }
    .promo-banner h3 {
      font-family: 'Poppins', sans-serif; font-weight: 600;
      font-size: 1rem; margin: 0 0 4px;
    }
    .promo-banner p {
      font-family: 'Inter', sans-serif; font-size: 0.85rem;
      color: rgba(255,255,255,0.75); margin: 0;
    }
    @media (max-width: 1024px) {
      .categories-grid { grid-template-columns: repeat(3, 1fr); }
      .products-grid { grid-template-columns: repeat(2, 1fr); }
      .promo-banner { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .hero-container { grid-template-columns: 1fr; }
      .hero-visual { display: none; }
      .hero-title { font-size: 2.2rem; }
      .categories-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 480px) {
      .categories-grid { grid-template-columns: repeat(2, 1fr); }
      .products-grid { grid-template-columns: 1fr; }
      .promo-banner { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {
  productService = inject(ProductService);

  categories = [
    { name: 'Laptops', icon: '💻' },
    { name: 'Smartphones', icon: '📱' },
    { name: 'Audio', icon: '🎧' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Tablets', icon: '📟' },
    { name: 'Wearables', icon: '⌚' },
  ];
}
