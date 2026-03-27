import { IProduct } from '../interfaces/product.interface';

// ENCAPSULAMIENTO (POO) — clase con lógica de negocio encapsulada
export class Product implements IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  badge?: string;

  constructor(data: IProduct) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.originalPrice = data.originalPrice;
    this.image = data.image;
    this.category = data.category;
    this.stock = data.stock;
    this.rating = data.rating;
    this.reviews = data.reviews;
    this.badge = data.badge;
  }

  // Método encapsulado — lógica de descuento
  get discountPercent(): number {
    if (!this.originalPrice) return 0;
    return Math.round((1 - this.price / this.originalPrice) * 100);
  }

  get hasDiscount(): boolean {
    return !!this.originalPrice && this.originalPrice > this.price;
  }

  get isAvailable(): boolean {
    return this.stock > 0;
  }

  get formattedPrice(): string {
    return `S/ ${this.price.toFixed(2)}`;
  }
}

// HERENCIA (POO) — producto destacado hereda de Product
export class FeaturedProduct extends Product {
  featuredUntil: Date;

  constructor(data: IProduct, featuredUntil: Date) {
    super(data); // llama al constructor padre
    this.featuredUntil = featuredUntil;
  }

  get isFeaturedActive(): boolean {
    return new Date() < this.featuredUntil;
  }
}
