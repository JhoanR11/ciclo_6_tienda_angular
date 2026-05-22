import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Category } from '../../../core/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);

  getAll(): Observable<Category[]> {
    return this.http.get<ApiResponse<Category[]>>('categories')
      .pipe(map(res => res.data));
  }

  getBySlug(slug: string): Observable<Category> {
    return this.http.get<ApiResponse<Category>>(`categories/${slug}`)
      .pipe(map(res => res.data));
  }
}