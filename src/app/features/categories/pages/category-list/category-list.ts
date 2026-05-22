import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss'
})
export class CategoryList implements OnInit {
  private categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar las categorías');
        this.loading.set(false);
      }
    });
  }
}