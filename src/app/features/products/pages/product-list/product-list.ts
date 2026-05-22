import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product.service';
import { ProductSummary } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);

  products = signal<ProductSummary[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los productos');
        this.loading.set(false);
      }
    });
  }
}