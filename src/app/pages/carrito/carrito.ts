import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink],
  template: `
    <div class="page-container">
      <h1 class="page-title">Mi carrito</h1>

      @if (cartService.isEmpty()) {
        <div class="empty-cart">
          <div class="empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para continuar con tu compra.</p>
          <a routerLink="/productos" class="btn-shop">Ver productos</a>
        </div>
      } @else {
        <div class="cart-layout">
          <!-- Items -->
          <div class="cart-items">
            <div class="cart-header">
              <span>Producto</span>
              <span>Cantidad</span>
              <span>Subtotal</span>
              <span></span>
            </div>

            @for (item of cartService.items(); track item.product.id) {
              <div class="cart-item">
                <div class="item-product">
                  <img [src]="item.product.image" [alt]="item.product.name" />
                  <div class="item-info">
                    <a [routerLink]="['/productos', item.product.id]" class="item-name">{{ item.product.name }}</a>
                    <span class="item-category">{{ item.product.category }}</span>
                    <span class="item-price">{{ item.product.formattedPrice }}</span>
                  </div>
                </div>

                <div class="item-qty">
                  <button (click)="cartService.updateQuantity(item.product.id, item.quantity - 1)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button (click)="cartService.updateQuantity(item.product.id, item.quantity + 1)"
                          [disabled]="item.quantity >= item.product.stock">+</button>
                </div>

                <span class="item-subtotal">{{ item.formattedSubtotal }}</span>

                <button class="item-remove" (click)="cartService.removeFromCart(item.product.id)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/><path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>
            }

            <div class="cart-footer">
              <button class="btn-clear" (click)="cartService.clearCart()">Vaciar carrito</button>
              <a routerLink="/productos" class="btn-continue">← Seguir comprando</a>
            </div>
          </div>

          <!-- Summary -->
          <div class="cart-summary">
            <h2>Resumen del pedido</h2>

            <div class="summary-row">
              <span>Subtotal ({{ cartService.totalItems() }} artículos)</span>
              <span>{{ cartService.formattedTotal() }}</span>
            </div>

            @if (cartService.savings() > 0) {
              <div class="summary-row savings">
                <span>Ahorros</span>
                <span>-S/ {{ cartService.savings().toFixed(2) }}</span>
              </div>
            }

            <div class="summary-row">
              <span>Envío</span>
              <span [style.color]="cartService.totalPrice() >= 299 ? '#10B981' : '#1F2937'">
                {{ cartService.totalPrice() >= 299 ? 'GRATIS' : 'S/ 15.00' }}
              </span>
            </div>

            @if (cartService.totalPrice() < 299) {
              <p class="free-shipping-hint">
                Agrega S/ {{ (299 - cartService.totalPrice()).toFixed(2) }} más para envío gratis
              </p>
            }

            <div class="summary-total">
              <span>Total</span>
              <span>S/ {{ (cartService.totalPrice() + (cartService.totalPrice() >= 299 ? 0 : 15)).toFixed(2) }}</span>
            </div>

            <a routerLink="/checkout" class="btn-checkout">
              Proceder al pago →
            </a>

            <div class="payment-methods">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" height="20" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" height="20" />
              <span style="font-size:0.8rem;color:#6b7280">Yape · Plin</span>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
    .page-title {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 2rem; color: #1F2937; margin-bottom: 32px;
    }
    /* Empty */
    .empty-cart { text-align: center; padding: 80px 0; }
    .empty-icon { font-size: 4rem; margin-bottom: 16px; }
    .empty-cart h2 {
      font-family: 'Poppins', sans-serif; font-weight: 600;
      font-size: 1.5rem; color: #1F2937; margin-bottom: 8px;
    }
    .empty-cart p { font-family: 'Inter', sans-serif; color: #6b7280; margin-bottom: 24px; }
    .btn-shop {
      display: inline-block; background: #2563EB; color: white;
      padding: 12px 28px; border-radius: 10px;
      font-family: 'Inter', sans-serif; font-weight: 500;
      text-decoration: none;
    }
    /* Layout */
    .cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
    /* Items */
    .cart-items { background: white; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden; }
    .cart-header {
      display: grid; grid-template-columns: 1fr 140px 120px 40px;
      padding: 14px 20px; background: #F8FAFC;
      border-bottom: 1px solid #e5e7eb;
      font-family: 'Inter', sans-serif; font-size: 0.8rem;
      font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;
    }
    .cart-item {
      display: grid; grid-template-columns: 1fr 140px 120px 40px;
      padding: 20px; border-bottom: 1px solid #f3f4f6;
      align-items: center;
    }
    .cart-item:last-child { border-bottom: none; }
    .item-product { display: flex; gap: 14px; align-items: center; }
    .item-product img {
      width: 72px; height: 72px; object-fit: cover;
      border-radius: 10px; background: #F8FAFC;
    }
    .item-name {
      font-family: 'Poppins', sans-serif; font-weight: 600;
      font-size: 0.9rem; color: #1F2937; text-decoration: none;
      display: block; margin-bottom: 4px;
    }
    .item-name:hover { color: #2563EB; }
    .item-category {
      font-family: 'Inter', sans-serif; font-size: 0.75rem;
      color: #9ca3af; display: block;
    }
    .item-price {
      font-family: 'Inter', sans-serif; font-size: 0.85rem;
      color: #2563EB; font-weight: 500; display: block; margin-top: 4px;
    }
    .item-qty {
      display: flex; align-items: center; gap: 0;
      border: 1px solid #e5e7eb; border-radius: 8px;
      overflow: hidden; width: fit-content;
    }
    .item-qty button {
      width: 32px; height: 32px; background: #F8FAFC;
      border: none; cursor: pointer; font-size: 1rem; color: #1F2937;
    }
    .item-qty button:disabled { color: #d1d5db; cursor: not-allowed; }
    .item-qty span {
      min-width: 36px; text-align: center;
      font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.9rem;
    }
    .item-subtotal {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 0.95rem; color: #1F2937;
    }
    .item-remove {
      background: none; border: none; cursor: pointer;
      color: #9ca3af; padding: 6px; border-radius: 6px;
      transition: all 0.2s; display: flex;
    }
    .item-remove:hover { background: #fee2e2; color: #ef4444; }
    .cart-footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 16px 20px; background: #F8FAFC;
    }
    .btn-clear {
      background: none; border: 1px solid #e5e7eb; border-radius: 8px;
      padding: 8px 16px; cursor: pointer; color: #6b7280;
      font-family: 'Inter', sans-serif; font-size: 0.875rem;
      transition: all 0.2s;
    }
    .btn-clear:hover { border-color: #ef4444; color: #ef4444; }
    .btn-continue {
      font-family: 'Inter', sans-serif; color: #2563EB;
      text-decoration: none; font-size: 0.875rem; font-weight: 500;
    }
    /* Summary */
    .cart-summary {
      background: white; border-radius: 16px; border: 1px solid #e5e7eb;
      padding: 24px; position: sticky; top: 88px;
    }
    .cart-summary h2 {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1.2rem; color: #1F2937; margin-bottom: 20px;
    }
    .summary-row {
      display: flex; justify-content: space-between;
      font-family: 'Inter', sans-serif; font-size: 0.9rem;
      color: #4b5563; margin-bottom: 12px;
    }
    .summary-row.savings span:last-child { color: #10B981; font-weight: 600; }
    .free-shipping-hint {
      font-family: 'Inter', sans-serif; font-size: 0.8rem;
      color: #f59e0b; background: #fffbeb; border-radius: 8px;
      padding: 8px 12px; margin-bottom: 12px;
    }
    .summary-total {
      display: flex; justify-content: space-between;
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1.1rem; color: #1F2937;
      border-top: 2px solid #e5e7eb; padding-top: 16px; margin-top: 4px; margin-bottom: 20px;
    }
    .btn-checkout {
      display: block; width: 100%; background: #2563EB; color: white;
      text-align: center; text-decoration: none;
      padding: 14px; border-radius: 12px;
      font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600;
      transition: background 0.2s; margin-bottom: 16px;
    }
    .btn-checkout:hover { background: #1E3A8A; }
    .payment-methods {
      display: flex; align-items: center; justify-content: center; gap: 12px;
    }
    .payment-methods img { height: 20px; object-fit: contain; }
    @media (max-width: 900px) {
      .cart-layout { grid-template-columns: 1fr; }
      .cart-summary { position: static; }
      .cart-header, .cart-item { grid-template-columns: 1fr 100px 80px 40px; }
    }
    @media (max-width: 600px) {
      .cart-header { display: none; }
      .cart-item { grid-template-columns: 1fr; gap: 12px; }
    }
  `]
})
export class CarritoComponent {
  cartService = inject(CartService);
}
