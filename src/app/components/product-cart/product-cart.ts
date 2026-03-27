import { Component, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  template: `
    <div class="product-card" [class.in-cart]="cartService.isInCart(product().id)">
      <!-- Badge -->
      @if (product().badge) {
        <span class="badge" [class]="'badge-' + getBadgeClass(product().badge!)">
          {{ product().badge }}
        </span>
      }

      <!-- Image -->
      <a [routerLink]="['/productos', product().id]" class="card-image-link">
        <div class="card-image">
          <img [src]="product().image" [alt]="product().name" loading="lazy" />
        </div>
      </a>

      <!-- Content -->
      <div class="card-content">
        <span class="card-category">{{ product().category }}</span>
        <a [routerLink]="['/productos', product().id]" class="card-title">
          {{ product().name }}
        </a>

        <!-- Rating -->
        <div class="card-rating">
          <div class="stars">
            @for (star of getStars(product().rating); track $index) {
              <span [class]="star">★</span>
            }
          </div>
          <span class="rating-count">({{ product().reviews }})</span>
        </div>

        <!-- Price -->
        <div class="card-price">
          <span class="price-current">{{ product().formattedPrice }}</span>
          @if (product().hasDiscount) {
            <span class="price-original">S/ {{ product().originalPrice?.toFixed(2) }}</span>
            <span class="price-discount">-{{ product().discountPercent }}%</span>
          }
        </div>

        <!-- Stock -->
        @if (product().stock <= 5 && product().stock > 0) {
          <p class="stock-warning">¡Solo quedan {{ product().stock }}!</p>
        }

        <!-- Actions -->
        <div class="card-actions">
          @if (product().isAvailable) {
            @if (cartService.isInCart(product().id)) {
              <button class="btn-in-cart" (click)="onRemove()">
                ✓ En el carrito
              </button>
            } @else {
              <button class="btn-add" (click)="onAddToCart()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Agregar
              </button>
            }
          } @else {
            <button class="btn-out" disabled>Sin stock</button>
          }
          <a [routerLink]="['/productos', product().id]" class="btn-detail">Ver</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white; border-radius: 16px;
      border: 1px solid #e5e7eb;
      overflow: hidden; position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex; flex-direction: column;
    }
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(37,99,235,0.12);
    }
    .product-card.in-cart { border-color: #10B981; }
    .badge {
      position: absolute; top: 12px; left: 12px; z-index: 1;
      padding: 4px 10px; border-radius: 20px;
      font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .badge-blue { background: #dbeafe; color: #1E3A8A; }
    .badge-green { background: #d1fae5; color: #065f46; }
    .badge-orange { background: #fed7aa; color: #9a3412; }
    .badge-purple { background: #ede9fe; color: #5b21b6; }
    .card-image-link { display: block; }
    .card-image {
      height: 200px; background: #F8FAFC;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .card-image img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.3s;
    }
    .product-card:hover .card-image img { transform: scale(1.05); }
    .card-content {
      padding: 16px; display: flex;
      flex-direction: column; gap: 8px; flex: 1;
    }
    .card-category {
      font-family: 'Inter', sans-serif; font-size: 0.75rem;
      color: #2563EB; font-weight: 500; text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .card-title {
      font-family: 'Poppins', sans-serif; font-weight: 600;
      font-size: 0.95rem; color: #1F2937;
      text-decoration: none; line-height: 1.3;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .card-title:hover { color: #2563EB; }
    .card-rating { display: flex; align-items: center; gap: 6px; }
    .stars { display: flex; }
    .stars span { font-size: 0.8rem; color: #d1d5db; }
    .stars .full { color: #f59e0b; }
    .stars .half { color: #f59e0b; opacity: 0.5; }
    .rating-count {
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem; color: #6b7280;
    }
    .card-price { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .price-current {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1.1rem; color: #1F2937;
    }
    .price-original {
      font-family: 'Inter', sans-serif; font-size: 0.85rem;
      color: #9ca3af; text-decoration: line-through;
    }
    .price-discount {
      font-family: 'Inter', sans-serif; font-size: 0.75rem;
      font-weight: 600; color: #10B981;
      background: #d1fae5; padding: 2px 6px; border-radius: 4px;
    }
    .stock-warning {
      font-family: 'Inter', sans-serif; font-size: 0.75rem;
      color: #ef4444; font-weight: 500; margin: 0;
    }
    .card-actions {
      display: flex; gap: 8px; margin-top: auto; padding-top: 4px;
    }
    .btn-add {
      flex: 1; display: flex; align-items: center; justify-content: center;
      gap: 6px; background: #2563EB; color: white;
      border: none; border-radius: 10px; padding: 10px;
      font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 500;
      cursor: pointer; transition: background 0.2s;
    }
    .btn-add:hover { background: #1E3A8A; }
    .btn-in-cart {
      flex: 1; background: #d1fae5; color: #065f46;
      border: none; border-radius: 10px; padding: 10px;
      font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 500;
      cursor: pointer;
    }
    .btn-out {
      flex: 1; background: #f3f4f6; color: #9ca3af;
      border: none; border-radius: 10px; padding: 10px;
      font-family: 'Inter', sans-serif; font-size: 0.85rem;
      cursor: not-allowed;
    }
    .btn-detail {
      background: #F8FAFC; color: #2563EB;
      border: 1px solid #dbeafe; border-radius: 10px;
      padding: 10px 16px; text-decoration: none;
      font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 500;
      transition: background 0.2s;
    }
    .btn-detail:hover { background: #eff6ff; }
  `]
})
export class ProductCardComponent {
  product = input.required<Product>();
  addedToCart = output<Product>();
  cartService = inject(CartService);

  onAddToCart(): void {
    this.cartService.addToCart(this.product());
    this.addedToCart.emit(this.product());
  }

  onRemove(): void {
    this.cartService.removeFromCart(this.product().id);
  }

  // POLIMORFISMO — acepta cualquier valor de badge y retorna clase
  getBadgeClass(badge: string): string {
    const map: Record<string, string> = {
      'Nuevo': 'blue', 'Destacado': 'purple',
      'Oferta': 'orange', 'Popular': 'green'
    };
    return map[badge] ?? 'blue';
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) return 'full';
      if (i < rating) return 'half';
      return 'empty';
    });
  }
}
