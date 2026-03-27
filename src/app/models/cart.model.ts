import { ICartItem, IOrder, ICustomer } from '../interfaces/product.interface';
import { Product } from './product.model';

// ENCAPSULAMIENTO — lógica del ítem del carrito
export class CartItem implements ICartItem {
  product: Product;
  quantity: number;

  constructor(product: Product, quantity: number = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  get subtotal(): number {
    return this.product.price * this.quantity;
  }

  get formattedSubtotal(): string {
    return `S/ ${this.subtotal.toFixed(2)}`;
  }

  increment(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

// ENCAPSULAMIENTO — lógica del pedido
export class Order implements IOrder {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  customer: ICustomer;

  constructor(items: CartItem[], customer: ICustomer) {
    this.id = `ORD-${Date.now()}`;
    this.items = items;
    this.total = items.reduce((sum, item) => sum + item.subtotal, 0);
    this.date = new Date();
    this.status = 'confirmed';
    this.customer = customer;
  }

  get formattedTotal(): string {
    return `S/ ${this.total.toFixed(2)}`;
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
