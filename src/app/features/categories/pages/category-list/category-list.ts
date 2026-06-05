import { Component, inject, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../core/models/category.model';
import { SkeletonCategoryCard } from '../../../../shared/components/skeleton-category-card/skeleton-category-card';
import iconCpu from '@iconify-icons/mdi/cpu-64-bit';
import iconAlertCircle from '@iconify-icons/mdi/alert-circle-outline';
import iconInbox from '@iconify-icons/mdi/inbox-outline';
import iconChevron from '@iconify-icons/mdi/chevron-right';
import iconSub from '@iconify-icons/mdi/sitemap-outline';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink, SkeletonCategoryCard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss'
})
export class CategoryList implements OnInit {
  private categoryService = inject(CategoryService);

  icons = {
    tech:  iconCpu,
    error: iconAlertCircle,
    empty: iconInbox,
    arrow: iconChevron,
    sub:   iconSub,
  };

  categories  = signal<Category[]>([]);
  loading     = signal(true);
  error       = signal<string | null>(null);
  skeletonItems = Array(8);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las categorías.');
        this.loading.set(false);
      }
    });
  }
}