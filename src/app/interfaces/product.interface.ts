// ABSTRACCIÓN (POO) — define el contrato de un producto
export interface IProduct {
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
}

// ABSTRACCIÓN — contrato del ítem en carrito
export interface ICartItem {
  product: IProduct;
  quantity: number;
}

// ABSTRACCIÓN — contrato del pedido
export interface IOrder {
  id: string;
  items: ICartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  customer: ICustomer;
}

export interface ICustomer {
  name: string;
  email: string;
  address: string;
  phone: string;
}
