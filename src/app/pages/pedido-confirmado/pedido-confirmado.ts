import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-pedido-confirmado',
  imports: [RouterLink],
  template: `
    <div class="confirm-container">
      @if (cartService.lastOrder()) {
        <div class="confirm-card">
          <div class="success-icon">✓</div>
          <h1>¡Pedido confirmado!</h1>
          <p class="order-id">Número de pedido: <strong>{{ cartService.lastOrder()!.id }}</strong></p>
          <p class="order-msg">
            Hemos recibido tu pedido. Te enviaremos un correo a
            <strong>{{ cartService.lastOrder()!.customer.email }}</strong> con los detalles.
          </p>

          <!-- Items summary -->
          <div class="order-summary">
            <h3>Resumen</h3>
            @for (item of cartService.lastOrder()!.items; track item.product.id) {
              <div class="confirm-item">
                <img [src]="item.product.image" [alt]="item.product.name" />
                <span>{{ item.product.name }} × {{ item.quantity }}</span>
                <span>{{ item.formattedSubtotal }}</span>
              </div>
            }
            <div class="confirm-total">
              <span>Total pagado</span>
              <span>{{ cartService.lastOrder()!.formattedTotal }}</span>
            </div>
          </div>

          <!-- Timeline -->
          <div class="timeline">
            <div class="timeline-step done">
              <div class="t-dot">✓</div>
              <div><strong>Pedido confirmado</strong><p>Ahora mismo</p></div>
            </div>
            <div class="timeline-step">
              <div class="t-dot">📦</div>
              <div><strong>En preparación</strong><p>1-2 horas</p></div>
            </div>
            <div class="timeline-step">
              <div class="t-dot">🚚</div>
              <div><strong>En camino</strong><p>Hoy o mañana</p></div>
            </div>
            <div class="timeline-step">
              <div class="t-dot">🏠</div>
              <div><strong>Entregado</strong><p>Dentro de 24h</p></div>
            </div>
          </div>

          <div class="confirm-actions">
            <a routerLink="/" class="btn-home">Ir al inicio</a>
            <a routerLink="/productos" class="btn-shop">Seguir comprando</a>
          </div>
        </div>
      } @else {
        <div class="confirm-card" style="text-align:center">
          <h2>No hay pedido activo</h2>
          <a routerLink="/" class="btn-home">Ir al inicio</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .confirm-container {
      min-height: 80vh; display: flex; align-items: center; justify-content: center;
      padding: 40px 24px; background: #F8FAFC;
    }
    .confirm-card {
      background: white; border-radius: 24px; border: 1px solid #e5e7eb;
      padding: 48px; max-width: 600px; width: 100%;
      text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.06);
    }
    .success-icon {
      width: 72px; height: 72px; border-radius: 50%;
      background: #d1fae5; color: #10B981;
      font-size: 2rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
      animation: pop 0.4s ease;
    }
    @keyframes pop {
      0% { transform: scale(0); opacity: 0; }
      70% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }
    h1 {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1.75rem; color: #1F2937; margin-bottom: 8px;
    }
    .order-id {
      font-family: 'Inter', sans-serif; font-size: 0.875rem;
      color: #9ca3af; margin-bottom: 8px;
    }
    .order-id strong { color: #2563EB; }
    .order-msg {
      font-family: 'Inter', sans-serif; font-size: 0.9rem;
      color: #4b5563; margin-bottom: 32px; line-height: 1.6;
    }
    .order-summary {
      background: #F8FAFC; border-radius: 12px;
      padding: 20px; text-align: left; margin-bottom: 32px;
    }
    .order-summary h3 {
      font-family: 'Poppins', sans-serif; font-weight: 600;
      font-size: 0.9rem; color: #1F2937; margin-bottom: 14px;
    }
    .confirm-item {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 10px;
      font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #4b5563;
    }
    .confirm-item img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; }
    .confirm-item span:last-child { margin-left: auto; font-weight: 600; color: #1F2937; }
    .confirm-total {
      display: flex; justify-content: space-between;
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1rem; color: #1F2937;
      border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 8px;
    }
    /* Timeline */
    .timeline { display: flex; gap: 0; margin-bottom: 32px; }
    .timeline-step {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      gap: 8px; position: relative; text-align: center;
    }
    .timeline-step:not(:last-child)::after {
      content: ''; position: absolute; top: 20px; left: 60%; width: 80%;
      height: 2px; background: #e5e7eb; z-index: 0;
    }
    .timeline-step.done:not(:last-child)::after { background: #10B981; }
    .t-dot {
      width: 40px; height: 40px; border-radius: 50%;
      background: #f3f4f6; border: 2px solid #e5e7eb;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; z-index: 1; position: relative;
    }
    .timeline-step.done .t-dot { background: #d1fae5; border-color: #10B981; }
    .timeline-step strong {
      font-family: 'Poppins', sans-serif; font-size: 0.75rem; color: #1F2937;
    }
    .timeline-step p { font-family: 'Inter', sans-serif; font-size: 0.7rem; color: #9ca3af; margin: 0; }
    /* Actions */
    .confirm-actions { display: flex; gap: 12px; justify-content: center; }
    .btn-home {
      background: #1F2937; color: white; text-decoration: none;
      padding: 12px 24px; border-radius: 10px;
      font-family: 'Inter', sans-serif; font-weight: 500;
    }
    .btn-shop {
      background: #2563EB; color: white; text-decoration: none;
      padding: 12px 24px; border-radius: 10px;
      font-family: 'Inter', sans-serif; font-weight: 500;
    }
  `]
})
export class PedidoConfirmadoComponent {
  cartService = inject(CartService);
}
