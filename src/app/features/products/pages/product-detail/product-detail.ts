import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  selectedImage = signal<string | null>(null);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.productService.getBySlug(slug).subscribe({
      next: (data) => {
        this.product.set(data);
        this.selectedImage.set(data.primary_image?.url ?? data.images?.[0]?.url ?? null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Producto no encontrado');
        this.loading.set(false);
      }
    });
  }
}