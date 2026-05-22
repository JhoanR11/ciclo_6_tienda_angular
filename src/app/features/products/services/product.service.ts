import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Product, ProductSummary } from '../../../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getAll(): Observable<ProductSummary[]> {
    return this.http.get<ApiResponse<ProductSummary[]>>('products')
      .pipe(map(res => res.data));
  }

  getBySlug(slug: string): Observable<Product> {
    return this.http.get<ApiResponse<Product>>(`products/${slug}`)
      .pipe(map(res => res.data));
  }
}