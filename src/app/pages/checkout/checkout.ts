import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ICustomer } from '../../interfaces/product.interface';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  template: `
    <div class="page-container">
      <!-- Steps -->
      <div class="steps">
        <div class="step done">✓ Carrito</div>
        <div class="step-line done"></div>
        <div class="step active">📋 Datos</div>
        <div class="step-line"></div>
        <div class="step">✓ Confirmación</div>
      </div>

      <div class="checkout-layout">
        <!-- Form -->
        <div class="checkout-form">
          <h2>Datos de envío</h2>

          <div class="form-grid">
            <div class="form-group">
              <label>Nombre completo *</label>
              <input
                type="text"
                placeholder="Juan Pérez"
                [value]="form().name"
                (input)="updateField('name', $event)"
              />
            </div>
            <div class="form-group">
              <label>Correo electrónico *</label>
              <input
                type="email"
                placeholder="juan@email.com"
                [value]="form().email"
                (input)="updateField('email', $event)"
              />
            </div>
            <div class="form-group">
              <label>Teléfono *</label>
              <input
                type="tel"
                placeholder="987 654 321"
                [value]="form().phone"
                (input)="updateField('phone', $event)"
              />
            </div>
            <div class="form-group full">
              <label>Dirección de envío *</label>
              <input
                type="text"
                placeholder="Av. Arequipa 1234, Lima"
                [value]="form().address"
                (input)="updateField('address', $event)"
              />
            </div>
          </div>

          <h2 style="margin-top:32px">Método de pago</h2>
          <div class="payment-options">
            @for (method of paymentMethods; track method.id) {
              <div
                class="payment-option"
                [class.selected]="selectedPayment() === method.id"
                (click)="selectedPayment.set(method.id)"
              >
                <span class="payment-icon">{{ method.icon }}</span>
                <span class="payment-name">{{ method.name }}</span>
                @if (selectedPayment() === method.id) {
                  <span class="check">✓</span>
                }
              </div>
            }
          </div>
        </div>

        <!-- Order summary -->
        <div class="order-summary">
          <h2>Tu pedido</h2>

          <div class="order-items">
            @for (item of cartService.items(); track item.product.id) {
              <div class="order-item">
                <img [src]="item.product.image" [alt]="item.product.name" />
                <div class="order-item-info">
                  <span class="order-item-name">{{ item.product.name }}</span>
                  <span class="order-item-qty">x{{ item.quantity }}</span>
                </div>
                <span class="order-item-price">{{ item.formattedSubtotal }}</span>
              </div>
            }
          </div>

          <div class="order-totals">
            <div class="total-row">
              <span>Subtotal</span><span>{{ cartService.formattedTotal() }}</span>
            </div>
            <div class="total-row">
              <span>Envío</span>
              <span>{{ cartService.totalPrice() >= 299 ? 'GRATIS' : 'S/ 15.00' }}</span>
            </div>
            <div class="total-row final">
              <span>Total</span>
              <span
                >S/
                {{
                  (cartService.totalPrice() + (cartService.totalPrice() >= 299 ? 0 : 15)).toFixed(2)
                }}</span
              >
            </div>
          </div>

          @if (error()) {
            <p class="error-msg">{{ error() }}</p>
          }

          <button class="btn-confirm" (click)="placeOrder()">Confirmar pedido</button>

          <a routerLink="/carrito" class="back-link">← Volver al carrito</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 24px;
      }
      /* Steps */
      .steps {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0;
        margin-bottom: 48px;
      }
      .step {
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        color: #9ca3af;
        font-weight: 500;
        padding: 8px 16px;
        border-radius: 20px;
      }
      .step.done {
        color: #10b981;
      }
      .step.active {
        background: #eff6ff;
        color: #2563eb;
        font-weight: 600;
      }
      .step-line {
        flex: 1;
        max-width: 80px;
        height: 2px;
        background: #e5e7eb;
      }
      .step-line.done {
        background: #10b981;
      }
      /* Layout */
      .checkout-layout {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 40px;
        align-items: start;
      }
      /* Form */
      .checkout-form {
        background: white;
        border-radius: 16px;
        border: 1px solid #e5e7eb;
        padding: 32px;
      }
      .checkout-form h2 {
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        font-size: 1.2rem;
        color: #1f2937;
        margin: 0 0 20px;
      }
      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .form-group.full {
        grid-column: 1 / -1;
      }
      .form-group label {
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        color: #4b5563;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .form-group input {
        padding: 10px 14px;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.2s;
      }
      .form-group input:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px #dbeafe;
      }
      /* Payment */
      .payment-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      .payment-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
      }
      .payment-option:hover {
        border-color: #bfdbfe;
        background: #f8fbff;
      }
      .payment-option.selected {
        border-color: #2563eb;
        background: #eff6ff;
      }
      .payment-icon {
        font-size: 1.3rem;
      }
      .payment-name {
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        color: #1f2937;
      }
      .check {
        margin-left: auto;
        color: #2563eb;
        font-weight: 700;
      }
      /* Summary */
      .order-summary {
        background: white;
        border-radius: 16px;
        border: 1px solid #e5e7eb;
        padding: 24px;
        position: sticky;
        top: 88px;
      }
      .order-summary h2 {
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        color: #1f2937;
        margin-bottom: 20px;
      }
      .order-items {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }
      .order-item {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .order-item img {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        object-fit: cover;
        background: #f8fafc;
      }
      .order-item-info {
        flex: 1;
      }
      .order-item-name {
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        font-weight: 500;
        color: #1f2937;
        display: block;
      }
      .order-item-qty {
        font-family: 'Inter', sans-serif;
        font-size: 0.75rem;
        color: #9ca3af;
      }
      .order-item-price {
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        color: #1f2937;
      }
      .order-totals {
        border-top: 1px solid #e5e7eb;
        padding-top: 16px;
        margin-bottom: 20px;
      }
      .total-row {
        display: flex;
        justify-content: space-between;
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        color: #4b5563;
        margin-bottom: 8px;
      }
      .total-row.final {
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        color: #1f2937;
        border-top: 2px solid #e5e7eb;
        padding-top: 12px;
        margin-top: 8px;
      }
      .error-msg {
        background: #fee2e2;
        color: #b91c1c;
        border-radius: 8px;
        padding: 10px 14px;
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        margin-bottom: 16px;
      }
      .btn-confirm {
        width: 100%;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 14px;
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.2s;
        margin-bottom: 12px;
      }
      .btn-confirm:hover {
        opacity: 0.9;
      }
      .back-link {
        display: block;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 0.875rem;
        color: #6b7280;
        text-decoration: none;
      }
      .back-link:hover {
        color: #2563eb;
      }
      @media (max-width: 900px) {
        .checkout-layout {
          grid-template-columns: 1fr;
        }
        .order-summary {
          position: static;
        }
      }
      @media (max-width: 480px) {
        .payment-options {
          grid-template-columns: 1fr;
        }
        .form-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CheckoutComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  form = signal<ICustomer>({ name: '', email: '', address: '', phone: '' });
  selectedPayment = signal('card');
  error = signal('');

  paymentMethods = [
    { id: 'card', name: 'Tarjeta', icon: '💳' },
    { id: 'yape', name: 'Yape', icon: '📱' },
    { id: 'plin', name: 'Plin', icon: '💜' },
    { id: 'transfer', name: 'Transferencia', icon: '🏦' },
  ];

  updateField(field: keyof ICustomer, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  placeOrder(): void {
    const f = this.form();
    if (!f.name || !f.email || !f.address || !f.phone) {
      this.error.set('Por favor completa todos los campos.');
      return;
    }
    this.error.set('');
    this.cartService.placeOrder(f);
    this.router.navigate(['/pedido-confirmado']);
  }
}
