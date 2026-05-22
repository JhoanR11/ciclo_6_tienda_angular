import { Category } from './category.model';

export interface ProductImage {
  id: number;
  url: string;
  is_primary: boolean;
  order: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  attributes: Record<string, any>;
  price: number;
  stock: number;
  is_active: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sku: string;
  base_price: number;
  min_price: number;
  is_active: boolean;
  is_service: boolean;
  category?: Category;
  variants?: ProductVariant[];
  images?: ProductImage[];
  primary_image?: ProductImage;
  created_at: string;
}

// Para el listado (ProductCollection devuelve menos campos)
export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  base_price: number;
  min_price: number;
  is_active: boolean;
  is_service: boolean;
  category?: Category;
  primary_image?: ProductImage;
}