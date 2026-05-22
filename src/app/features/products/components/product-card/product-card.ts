import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductSummary } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  product = input.required<ProductSummary>();
}