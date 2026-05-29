import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // <-- Importa HttpParams
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Product, ProductSummary } from '../../../core/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getAll(filtros: any = {}): Observable<ProductSummary[]> {
    // 1. Construimos los parámetros de forma segura
    let params = new HttpParams();
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params = params.append(key, filtros[key]);
      }
    });

    // 2. Los pasamos a la petición
    return this.http.get<ApiResponse<ProductSummary[]>>('products', { params })
      .pipe(map(res => res.data));
  }

  getBySlug(slug: string): Observable<Product> {
    return this.http.get<ApiResponse<Product>>(`products/${slug}`)
      .pipe(map(res => res.data));
  }
}