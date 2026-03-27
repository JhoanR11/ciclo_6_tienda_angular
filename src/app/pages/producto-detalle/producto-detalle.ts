import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-producto-detalle',
  imports: [RouterLink],
  template: `
    @if (product()) {
      <div class="page-container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <a routerLink="/">Inicio</a>
          <span>›</span>
          <a routerLink="/productos">Productos</a>
          <span>›</span>
          <span>{{ product()!.name }}</span>
        </nav>

        <div class="detail-layout">
          <!-- Image -->
          <div class="detail-image">
            <img [src]="product()!.image" [alt]="product()!.name" />
            @if (product()!.hasDiscount) {
              <span class="discount-tag">-{{ product()!.discountPercent }}%</span>
            }
          </div>

          <!-- Info -->
          <div class="detail-info">
            <span class="detail-category">{{ product()!.category }}</span>
            <h1 class="detail-title">{{ product()!.name }}</h1>

            <!-- Rating -->
            <div class="detail-rating">
              <div class="stars">
                @for (i of [1,2,3,4,5]; track i) {
                  <span [style.color]="i <= product()!.rating ? '#f59e0b' : '#d1d5db'">★</span>
                }
              </div>
              <span>{{ product()!.rating }} ({{ product()!.reviews }} reseñas)</span>
            </div>

            <!-- Price -->
            <div class="detail-price">
              <span class="price-main">{{ product()!.formattedPrice }}</span>
              @if (product()!.hasDiscount) {
                <span class="price-old">S/ {{ product()!.originalPrice?.toFixed(2) }}</span>
                <span class="price-save">Ahorras S/ {{ (product()!.originalPrice! - product()!.price).toFixed(2) }}</span>
              }
            </div>

            <p class="detail-desc">{{ product()!.description }}</p>

            <!-- Stock -->
            <div class="stock-info" [class.low]="product()!.stock <= 5">
              <span class="stock-dot"></span>
              @if (product()!.isAvailable) {
                <span>{{ product()!.stock <= 5 ? '¡Solo quedan ' + product()!.stock + '!' : 'En stock (' + product()!.stock + ' disponibles)' }}</span>
              } @else {
                <span>Sin stock</span>
              }
            </div>

            <!-- Quantity -->
            <div class="quantity-selector">
              <span>Cantidad:</span>
              <div class="qty-controls">
                <button (click)="decrement()" [disabled]="quantity() <= 1">−</button>
                <span>{{ quantity() }}</span>
                <button (click)="increment()" [disabled]="quantity() >= product()!.stock">+</button>
              </div>
            </div>

            <!-- Actions -->
            <div class="detail-actions">
              @if (product()!.isAvailable) {
                <button class="btn-add-cart" (click)="addToCart()">
                  {{ cartService.isInCart(product()!.id) ? '✓ En el carrito' : '🛒 Agregar al carrito' }}
                </button>
                <a routerLink="/carrito" class="btn-buy-now">Comprar ahora</a>
              } @else {
                <button class="btn-disabled" disabled>Sin stock</button>
              }
            </div>

            <!-- Features -->
            <div class="features">
              <div class="feature"><span>🚚</span><div><strong>Envío gratis</strong><p>En compras +S/ 299</p></div></div>
              <div class="feature"><span>🛡️</span><div><strong>Garantía 12 meses</strong><p>Cobertura total</p></div></div>
              <div class="feature"><span>↩️</span><div><strong>Devolución 30 días</strong><p>Sin preguntas</p></div></div>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="not-found">
        <h2>Producto no encontrado</h2>
        <a routerLink="/productos">← Volver a productos</a>
      </div>
    }
  `,
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }
    .breadcrumb {
      display: flex; align-items: center; gap: 8px;
      font-family: 'Inter', sans-serif; font-size: 0.85rem;
      color: #6b7280; margin-bottom: 32px;
    }
    .breadcrumb a { color: #2563EB; text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .detail-layout {
      display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;
    }
    .detail-image {
      border-radius: 20px; overflow: hidden;
      background: #F8FAFC; position: relative;
      aspect-ratio: 1;
    }
    .detail-image img { width: 100%; height: 100%; object-fit: cover; }
    .discount-tag {
      position: absolute; top: 16px; right: 16px;
      background: #10B981; color: white;
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1rem; padding: 8px 14px; border-radius: 10px;
    }
    .detail-category {
      font-family: 'Inter', sans-serif; font-size: 0.8rem;
      color: #2563EB; font-weight: 500; text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .detail-title {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1.8rem; color: #1F2937; margin: 8px 0 16px; line-height: 1.2;
    }
    .detail-rating {
      display: flex; align-items: center; gap: 10px;
      font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #6b7280;
      margin-bottom: 20px;
    }
    .stars { font-size: 1.1rem; }
    .detail-price {
      display: flex; align-items: center; gap: 12px;
      flex-wrap: wrap; margin-bottom: 20px;
    }
    .price-main {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 2rem; color: #1F2937;
    }
    .price-old {
      font-family: 'Inter', sans-serif; font-size: 1rem;
      color: #9ca3af; text-decoration: line-through;
    }
    .price-save {
      background: #d1fae5; color: #065f46;
      font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600;
      padding: 4px 10px; border-radius: 6px;
    }
    .detail-desc {
      font-family: 'Inter', sans-serif; color: #4b5563;
      line-height: 1.7; margin-bottom: 20px;
    }
    .stock-info {
      display: flex; align-items: center; gap: 8px;
      font-family: 'Inter', sans-serif; font-size: 0.875rem;
      color: #10B981; font-weight: 500; margin-bottom: 20px;
    }
    .stock-info.low { color: #ef4444; }
    .stock-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: currentColor;
    }
    .quantity-selector {
      display: flex; align-items: center; gap: 16px;
      margin-bottom: 24px;
      font-family: 'Inter', sans-serif; font-weight: 500; color: #1F2937;
    }
    .qty-controls {
      display: flex; align-items: center; gap: 0;
      border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;
    }
    .qty-controls button {
      width: 40px; height: 40px; background: #F8FAFC;
      border: none; cursor: pointer; font-size: 1.2rem;
      color: #1F2937; transition: background 0.2s;
    }
    .qty-controls button:hover:not(:disabled) { background: #eff6ff; color: #2563EB; }
    .qty-controls button:disabled { color: #d1d5db; cursor: not-allowed; }
    .qty-controls span {
      min-width: 48px; text-align: center;
      font-family: 'Poppins', sans-serif; font-weight: 600;
    }
    .detail-actions { display: flex; gap: 12px; margin-bottom: 32px; }
    .btn-add-cart {
      flex: 1; background: #2563EB; color: white;
      border: none; border-radius: 12px; padding: 14px;
      font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500;
      cursor: pointer; transition: background 0.2s;
    }
    .btn-add-cart:hover { background: #1E3A8A; }
    .btn-buy-now {
      flex: 1; background: #10B981; color: white;
      border-radius: 12px; padding: 14px;
      font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500;
      text-decoration: none; text-align: center; transition: opacity 0.2s;
    }
    .btn-buy-now:hover { opacity: 0.9; }
    .btn-disabled {
      flex: 1; background: #e5e7eb; color: #9ca3af;
      border: none; border-radius: 12px; padding: 14px;
      font-family: 'Inter', sans-serif; font-size: 1rem;
      cursor: not-allowed;
    }
    .features { display: flex; flex-direction: column; gap: 12px; }
    .feature {
      display: flex; align-items: center; gap: 12px;
      padding: 12px; background: #F8FAFC; border-radius: 10px;
    }
    .feature span { font-size: 1.3rem; }
    .feature strong {
      font-family: 'Poppins', sans-serif; font-size: 0.875rem;
      color: #1F2937; display: block;
    }
    .feature p {
      font-family: 'Inter', sans-serif; font-size: 0.8rem;
      color: #6b7280; margin: 0;
    }
    .not-found { text-align: center; padding: 80px 24px; }
    .not-found h2 { font-family: 'Poppins', sans-serif; color: #1F2937; }
    .not-found a { color: #2563EB; text-decoration: none; }
    @media (max-width: 768px) {
      .detail-layout { grid-template-columns: 1fr; gap: 32px; }
    }
  `]
})
export class ProductoDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);

  product = signal<Product | null>(null);
  quantity = signal(1);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product.set(this.productService.getProductById(id) ?? null);
  }

  increment(): void {
    if (this.quantity() < (this.product()?.stock ?? 1)) {
      this.quantity.update(q => q + 1);
    }
  }

  decrement(): void {
    if (this.quantity() > 1) this.quantity.update(q => q - 1);
  }

  addToCart(): void {
    const p = this.product();
    if (p) this.cartService.addToCart(p, this.quantity());
  }
}
