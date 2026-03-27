import { Injectable, signal, computed } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Product } from '../models/product.model';

// PRINCIPIO S (SOLID) — solo maneja lógica de productos
// PATRÓN SINGLETON — providedIn: 'root'
// PATRÓN REPOSITORY — abstrae el origen de los datos
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // PATRÓN OBSERVER — signals para estado reactivo
  private _products = signal<Product[]>(this.loadMockProducts());
  private _selectedProduct = signal<Product | null>(null);
  private _searchTerm = signal<string>('');
  private _selectedCategory = signal<string>('all');

  // Computed — PRINCIPIO de inmutabilidad
  readonly products = computed(() => {
    let result = this._products();
    const term = this._searchTerm().toLowerCase();
    const category = this._selectedCategory();

    if (term) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    return result;
  });

  readonly selectedProduct = this._selectedProduct.asReadonly();
  readonly categories = computed(() => {
    const cats = [...new Set(this._products().map(p => p.category))];
    return ['all', ...cats];
  });

  readonly featuredProducts = computed(() =>
    this._products().filter(p => p.badge === 'Destacado').slice(0, 4)
  );

  // PRINCIPIO O (SOLID) — abierto para extensión vía método público
  getProductById(id: number): Product | undefined {
    return this._products().find(p => p.id === id);
  }

  selectProduct(id: number): void {
    const product = this.getProductById(id);
    this._selectedProduct.set(product ?? null);
  }

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  setCategory(category: string): void {
    this._selectedCategory.set(category);
  }

  // POLIMORFISMO — acepta cualquier objeto que implemente IProduct
  private loadMockProducts(): Product[] {
    const data: IProduct[] = [
      {
        id: 1, name: 'MacBook Pro M3', description: 'Laptop profesional con chip M3, 16GB RAM, 512GB SSD.',
        price: 8999, originalPrice: 10499, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        category: 'Laptops', stock: 15, rating: 4.9, reviews: 328, badge: 'Destacado'
      },
      {
        id: 2, name: 'iPhone 15 Pro', description: 'Smartphone Apple con titanio, cámara 48MP y chip A17 Pro.',
        price: 4599, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
        category: 'Smartphones', stock: 30, rating: 4.8, reviews: 512, badge: 'Nuevo'
      },
      {
        id: 3, name: 'Samsung Galaxy S24 Ultra', description: 'Android premium con S Pen integrado y zoom 100x.',
        price: 4299, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
        category: 'Smartphones', stock: 20, rating: 4.7, reviews: 289, badge: 'Destacado'
      },
      {
        id: 4, name: 'Sony WH-1000XM5', description: 'Auriculares inalámbricos con cancelación de ruido líder.',
        price: 1299, originalPrice: 1599, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
        category: 'Audio', stock: 45, rating: 4.9, reviews: 678, badge: 'Oferta'
      },
      {
        id: 5, name: 'Dell XPS 15', description: 'Laptop premium con pantalla OLED 4K y RTX 4060.',
        price: 7499, originalPrice: 8299, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400',
        category: 'Laptops', stock: 10, rating: 4.6, reviews: 145, badge: 'Oferta'
      },
      {
        id: 6, name: 'iPad Pro M2', description: 'Tablet profesional con pantalla Liquid Retina XDR 12.9".',
        price: 5299, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        category: 'Tablets', stock: 25, rating: 4.8, reviews: 203
      },
      {
        id: 7, name: 'LG UltraWide 34"', description: 'Monitor curvo ultrawide 21:9 QHD para productividad.',
        price: 2199, originalPrice: 2599, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
        category: 'Monitores', stock: 18, rating: 4.7, reviews: 167, badge: 'Oferta'
      },
      {
        id: 8, name: 'Logitech MX Master 3', description: 'Mouse ergonómico inalámbrico para trabajo profesional.',
        price: 499, originalPrice: 599, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
        category: 'Accesorios', stock: 60, rating: 4.8, reviews: 892
      },
      {
        id: 9, name: 'Nintendo Switch OLED', description: 'Consola híbrida con pantalla OLED vibrante de 7".',
        price: 1599, image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400',
        category: 'Gaming', stock: 35, rating: 4.9, reviews: 1203, badge: 'Popular'
      },
      {
        id: 10, name: 'Apple Watch Series 9', description: 'Smartwatch con chip S9, pantalla siempre activa y Siri.',
        price: 1899, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
        category: 'Wearables', stock: 40, rating: 4.7, reviews: 445, badge: 'Nuevo'
      },
      {
        id: 11, name: 'GoPro Hero 12', description: 'Cámara de acción 5.3K con HyperSmooth 6.0.',
        price: 1499, originalPrice: 1799, image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400',
        category: 'Cámaras', stock: 22, rating: 4.6, reviews: 334, badge: 'Oferta'
      },
      {
        id: 12, name: 'Razer BlackWidow V4', description: 'Teclado mecánico gaming con switches Razer Green.',
        price: 649, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
        category: 'Gaming', stock: 28, rating: 4.5, reviews: 267
      },
    ];
    return data.map(d => new Product(d));
  }
}
