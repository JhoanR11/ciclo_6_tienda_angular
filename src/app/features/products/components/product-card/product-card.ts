import { Component, computed, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductSummary } from '../../../../core/models/product.model';
import iconCart from '@iconify-icons/mdi/cart-outline';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  product = input.required<ProductSummary>();

  icons = { cart: iconCart };

  discount = computed(() => {
    const { base_price, min_price } = this.product();
    if (!base_price || min_price >= base_price) return null;
    return Math.round((1 - min_price / base_price) * 100);
  });
}