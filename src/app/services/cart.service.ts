import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem, Order } from '../models/cart.model';
import { ICustomer } from '../interfaces/product.interface';

// PRINCIPIO S (SOLID) — solo maneja lógica del carrito
// PATRÓN SINGLETON + OBSERVER
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _items = signal<CartItem[]>([]);
  private _lastOrder = signal<Order | null>(null);

  // Computed reactivos
  readonly items = this._items.asReadonly();
  readonly lastOrder = this._lastOrder.asReadonly();

  readonly totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.subtotal, 0)
  );

  readonly formattedTotal = computed(() =>
    `S/ ${this.totalPrice().toFixed(2)}`
  );

  readonly isEmpty = computed(() => this._items().length === 0);

  readonly savings = computed(() => {
    return this._items().reduce((sum, item) => {
      if (item.product.originalPrice) {
        return sum + (item.product.originalPrice - item.product.price) * item.quantity;
      }
      return sum;
    }, 0);
  });

  // PRINCIPIO O (SOLID) — métodos extensibles
  addToCart(product: Product, quantity: number = 1): void {
    const current = this._items();
    const existingIndex = current.findIndex(i => i.product.id === product.id);

    if (existingIndex >= 0) {
      const updated = [...current];
      for (let i = 0; i < quantity; i++) {
        updated[existingIndex].increment();
      }
      this._items.set(updated);
    } else {
      this._items.set([...current, new CartItem(product, quantity)]);
    }
  }

  removeFromCart(productId: number): void {
    this._items.set(this._items().filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const updated = this._items().map(item => {
      if (item.product.id === productId) {
        item.quantity = Math.min(quantity, item.product.stock);
      }
      return item;
    });
    this._items.set([...updated]);
  }

  clearCart(): void {
    this._items.set([]);
  }

  isInCart(productId: number): boolean {
    return this._items().some(i => i.product.id === productId);
  }

  getItemQuantity(productId: number): number {
    return this._items().find(i => i.product.id === productId)?.quantity ?? 0;
  }

  // Genera la orden y limpia el carrito
  placeOrder(customer: ICustomer): Order {
    const order = new Order(this._items(), customer);
    this._lastOrder.set(order);
    this.clearCart();
    return order;
  }
}
