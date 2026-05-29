import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private route = inject(ActivatedRoute); // Inyectamos para leer la URL

  products = signal<ProductSummary[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    // Escuchamos si cambia la URL (ej: ?category_id=1)
    this.route.queryParams.subscribe(params => {
      this.loading.set(true); // Reiniciamos el estado de carga

      // Le pasamos los params al servicio
      this.productService.getAll(params).subscribe({
        next: (data) => {
          this.products.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Error al cargar los productos');
          this.loading.set(false);
        }
      });
    });
  }
}