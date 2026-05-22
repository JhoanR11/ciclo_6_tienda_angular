import { Component, inject, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { ProductSummary } from '../../../../core/models/product.model';
import { Category } from '../../../../core/models/category.model';
import iconCpu from '@iconify-icons/mdi/cpu-64-bit';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  icons = {
    tech: iconCpu
  };
  products = signal<ProductSummary[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data) => { this.products.set(data.slice(0, 8)); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories.set(data.slice(0, 6))
    });
  }
}