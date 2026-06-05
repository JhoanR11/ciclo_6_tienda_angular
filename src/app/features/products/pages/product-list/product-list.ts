import { Component, inject, OnInit, signal, computed, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { SkeletonCard } from '../../../../shared/components/skeleton-card/skeleton-card';
import { ProductService } from '../../services/product.service';
import { ProductSummary } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, SkeletonCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  products = signal<ProductSummary[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  private windowWidth = signal(window.innerWidth);
  private resizeObserver = new ResizeObserver(() => {
    this.windowWidth.set(window.innerWidth);
  });

  skeletonItems = computed(() => {
    const width = this.windowWidth();
    let columns: number;

    if (width >= 1024) {
      columns = 4;
    } else if (width >= 768) {
      columns = 3;
    } else if (width >= 480) {
      columns = 2;
    } else {
      columns = 1;
    }

    return Array.from({ length: columns * 2 });
  });

  ngOnInit() {
    this.resizeObserver.observe(document.body);

    this.route.queryParams.subscribe(params => {
      this.loading.set(true);
      this.error.set(null);

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

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
}