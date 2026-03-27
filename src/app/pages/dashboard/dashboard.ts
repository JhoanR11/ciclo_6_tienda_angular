import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  template: `
    <div class="page-container">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Panel de administración — TechStore</p>

      <!-- KPIs -->
      <div class="kpi-grid">
        @for (kpi of kpis; track kpi.label) {
          <div class="kpi-card">
            <div class="kpi-icon" [style.background]="kpi.bg">{{ kpi.icon }}</div>
            <div class="kpi-info">
              <span class="kpi-value">{{ kpi.value }}</span>
              <span class="kpi-label">{{ kpi.label }}</span>
              <span class="kpi-change" [class.up]="kpi.up">
                {{ kpi.up ? '↑' : '↓' }} {{ kpi.change }}
              </span>
            </div>
          </div>
        }
      </div>

      <!-- Products table -->
      <div class="table-card">
        <div class="table-header">
          <h2>Inventario de productos</h2>
          <button class="btn-add">+ Agregar producto</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              @for (product of productService.products(); track product.id) {
                <tr>
                  <td>
                    <div class="product-cell">
                      <img [src]="product.image" [alt]="product.name" />
                      <span>{{ product.name }}</span>
                    </div>
                  </td>
                  <td><span class="tag">{{ product.category }}</span></td>
                  <td>{{ product.formattedPrice }}</td>
                  <td>
                    <span [class]="product.stock <= 5 ? 'stock-low' : 'stock-ok'">
                      {{ product.stock }}
                    </span>
                  </td>
                  <td>★ {{ product.rating }}</td>
                  <td>
                    <span class="status" [class]="product.isAvailable ? 'active' : 'inactive'">
                      {{ product.isAvailable ? 'Activo' : 'Sin stock' }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
    .page-title {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 2rem; color: #1F2937; margin: 0 0 4px;
    }
    .page-subtitle { font-family: 'Inter', sans-serif; color: #6b7280; margin-bottom: 32px; }
    /* KPIs */
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
    .kpi-card {
      background: white; border: 1px solid #e5e7eb; border-radius: 16px;
      padding: 20px; display: flex; align-items: center; gap: 16px;
    }
    .kpi-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; flex-shrink: 0;
    }
    .kpi-info { display: flex; flex-direction: column; }
    .kpi-value {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 1.5rem; color: #1F2937;
    }
    .kpi-label { font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #6b7280; }
    .kpi-change { font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #ef4444; }
    .kpi-change.up { color: #10B981; }
    /* Table */
    .table-card { background: white; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; }
    .table-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; border-bottom: 1px solid #e5e7eb;
    }
    .table-header h2 {
      font-family: 'Poppins', sans-serif; font-weight: 600;
      font-size: 1.1rem; color: #1F2937; margin: 0;
    }
    .btn-add {
      background: #2563EB; color: white; border: none;
      padding: 8px 16px; border-radius: 8px; cursor: pointer;
      font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 500;
    }
    .table-wrapper { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    thead tr { background: #F8FAFC; }
    th {
      padding: 12px 20px; text-align: left;
      font-family: 'Inter', sans-serif; font-size: 0.75rem;
      font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;
    }
    td {
      padding: 14px 20px; border-bottom: 1px solid #f3f4f6;
      font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #4b5563;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: #f9fafb; }
    .product-cell { display: flex; align-items: center; gap: 10px; }
    .product-cell img { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; }
    .product-cell span { font-weight: 500; color: #1F2937; }
    .tag {
      background: #eff6ff; color: #2563EB; border-radius: 6px;
      padding: 3px 8px; font-size: 0.75rem; font-weight: 500;
    }
    .stock-ok { color: #10B981; font-weight: 600; }
    .stock-low { color: #ef4444; font-weight: 600; }
    .status {
      padding: 4px 10px; border-radius: 20px;
      font-size: 0.75rem; font-weight: 600;
    }
    .status.active { background: #d1fae5; color: #065f46; }
    .status.inactive { background: #fee2e2; color: #b91c1c; }
    @media (max-width: 900px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 480px) { .kpi-grid { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent {
  productService = inject(ProductService);

  kpis = [
    { icon: '💰', label: 'Ventas hoy', value: 'S/ 12,450', change: '18%', up: true, bg: '#dbeafe' },
    { icon: '🛒', label: 'Pedidos', value: '34', change: '5%', up: true, bg: '#d1fae5' },
    { icon: '👥', label: 'Clientes', value: '1,284', change: '12%', up: true, bg: '#ede9fe' },
    { icon: '📦', label: 'Productos', value: '12', change: '2%', up: false, bg: '#fed7aa' },
  ];
}
