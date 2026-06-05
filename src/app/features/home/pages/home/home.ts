import { Component, inject, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { SkeletonCard } from '../../../../shared/components/skeleton-card/skeleton-card';
import { SkeletonCategoryCard } from '../../../../shared/components/skeleton-category-card/skeleton-category-card';
import { ProductSummary } from '../../../../core/models/product.model';
import { Category } from '../../../../core/models/category.model';
import iconCpu from '@iconify-icons/mdi/cpu-64-bit';
import iconLaptop from '@iconify-icons/mdi/laptop';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard, SkeletonCard, SkeletonCategoryCard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private productService  = inject(ProductService);
  private categoryService = inject(CategoryService);

  icons = {
    tech:       iconCpu,
    heroDevice: iconLaptop,
  };

  products          = signal<ProductSummary[]>([]);
  categories        = signal<Category[]>([]);
  loadingProducts   = signal(true);
  loadingCategories = signal(true);

  // Array fijo para iterar los skeletons — mismo número que los items reales esperados
  skeletonItems = Array(4);

  ngOnInit() {
    this.productService.getAll().subscribe({
      next:  (data) => { this.products.set(data.slice(0, 8)); this.loadingProducts.set(false); },
      error: ()     => this.loadingProducts.set(false),
    });

    this.categoryService.getAll().subscribe({
      next:  (data) => { this.categories.set(data.slice(0, 4)); this.loadingCategories.set(false); },
      error: ()     => this.loadingCategories.set(false),
    });
  }
}