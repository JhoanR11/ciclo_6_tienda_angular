import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-cart/product-cart';

@Component({
  selector: 'app-productos',
  imports: [ProductCardComponent],
  template: `
    <div class="page-container">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Productos</h1>
          <p class="page-subtitle">{{ productService.products().length }} productos encontrados</p>
        </div>
      </div>

      <div class="page-layout">
        <!-- Sidebar filters -->
        <aside class="sidebar">
          <div class="filter-group">
            <h3>Buscar</h3>
            <div class="search-input">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Buscar..." (input)="onSearch($event)" />
            </div>
          </div>

          <div class="filter-group">
            <h3>Categoría</h3>
            <div class="filter-options">
              @for (cat of productService.categories(); track cat) {
                <button
                  class="filter-option"
                  [class.active]="selectedCategory() === cat"
                  (click)="setCategory(cat)">
                  {{ cat === 'all' ? 'Todos' : cat }}
                </button>
              }
            </div>
          </div>

          <div class="filter-group">
            <h3>Precio</h3>
            <div class="price-inputs">
              <input type="number" placeholder="Mín" [(value)]="minPrice" />
              <span>—</span>
              <input type="number" placeholder="Máx" [(value)]="maxPrice" />
            </div>
          </div>

          <div class="filter-group">
            <h3>Ordenar por</h3>
            <select class="sort-select" (change)="onSort($event)">
              <option value="">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>
        </aside>

        <!-- Products -->
        <div class="products-area">
          @if (productService.products().length === 0) {
            <div class="empty-state">
              <span>🔍</span>
              <p>No se encontraron productos</p>
              <button (click)="clearFilters()">Limpiar filtros</button>
            </div>
          } @else {
            <div class="products-grid">
              @for (product of sortedProducts(); track product.id) {
                <app-product-card [product]="product" />
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
    .page-header { margin-bottom: 32px; }
    .page-title {
      font-family: 'Poppins', sans-serif; font-weight: 700;
      font-size: 2rem; color: #1F2937; margin: 0 0 4px;
    }
    .page-subtitle {
      font-family: 'Inter', sans-serif; color: #6b7280; margin: 0;
    }
    .page-layout { display: grid; grid-template-columns: 240px 1fr; gap: 32px; }
    .sidebar {
      display: flex; flex-direction: column; gap: 24px;
      height: fit-content; position: sticky; top: 88px;
    }
    .filter-group h3 {
      font-family: 'Poppins', sans-serif; font-weight: 600;
      font-size: 0.875rem; color: #1F2937; margin: 0 0 10px;
      text-transform: uppercase; letter-spacing: 0.05em;
    }
    .search-input {
      display: flex; align-items: center; gap: 8px;
      background: #F8FAFC; border: 1px solid #e5e7eb;
      border-radius: 8px; padding: 8px 12px; color: #9ca3af;
    }
    .search-input input {
      border: none; background: transparent; outline: none;
      font-family: 'Inter', sans-serif; font-size: 0.875rem; width: 100%;
    }
    .filter-options { display: flex; flex-direction: column; gap: 4px; }
    .filter-option {
      text-align: left; background: transparent;
      border: 1px solid transparent; border-radius: 8px;
      padding: 7px 12px; cursor: pointer;
      font-family: 'Inter', sans-serif; font-size: 0.875rem; color: #4b5563;
      transition: all 0.2s;
    }
    .filter-option:hover { background: #F8FAFC; border-color: #e5e7eb; }
    .filter-option.active { background: #eff6ff; color: #2563EB; border-color: #bfdbfe; font-weight: 500; }
    .price-inputs { display: flex; align-items: center; gap: 8px; }
    .price-inputs input {
      flex: 1; padding: 8px; border: 1px solid #e5e7eb;
      border-radius: 8px; font-family: 'Inter', sans-serif;
      font-size: 0.875rem; outline: none;
    }
    .price-inputs span { color: #9ca3af; font-size: 0.8rem; }
    .sort-select {
      width: 100%; padding: 8px 12px; border: 1px solid #e5e7eb;
      border-radius: 8px; font-family: 'Inter', sans-serif;
      font-size: 0.875rem; outline: none; background: white; cursor: pointer;
    }
    .products-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    }
    .empty-state {
      grid-column: 1/-1; text-align: center; padding: 80px 0;
    }
    .empty-state span { font-size: 3rem; }
    .empty-state p { font-family: 'Inter', sans-serif; color: #6b7280; margin: 12px 0; }
    .empty-state button {
      background: #2563EB; color: white; border: none;
      padding: 10px 20px; border-radius: 8px; cursor: pointer;
      font-family: 'Inter', sans-serif;
    }
    @media (max-width: 900px) {
      .page-layout { grid-template-columns: 1fr; }
      .sidebar { position: static; }
      .products-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 480px) {
      .products-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ProductosComponent {
  productService = inject(ProductService);
  selectedCategory = signal('all');
  sortBy = signal('');
  minPrice = signal('');
  maxPrice = signal('');

  sortedProducts() {
    let products = [...this.productService.products()];
    switch (this.sortBy()) {
      case 'price-asc': return products.sort((a, b) => a.price - b.price);
      case 'price-desc': return products.sort((a, b) => b.price - a.price);
      case 'rating': return products.sort((a, b) => b.rating - a.rating);
      default: return products;
    }
  }

  onSearch(event: Event): void {
    this.productService.setSearchTerm((event.target as HTMLInputElement).value);
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.productService.setCategory(cat);
  }

  onSort(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value);
  }

  clearFilters(): void {
    this.productService.setSearchTerm('');
    this.productService.setCategory('all');
    this.selectedCategory.set('all');
    this.sortBy.set('');
  }
}
