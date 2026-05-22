import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home/home').then(m => m.Home)
  },
  {
    path: 'productos',
    loadComponent: () => import('./features/products/pages/product-list/product-list').then(m => m.ProductList)
  },
  {
    path: 'productos/:slug',
    loadComponent: () => import('./features/products/pages/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./features/categories/pages/category-list/category-list').then(m => m.CategoryList)
  },
  {
    path: '**',
    redirectTo: ''
  }
];