import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import iconChessKing from '@iconify-icons/mdi/chess-king'; // Logo realeza/Lelouch
import iconSearch from '@iconify-icons/mdi/magnify';
import iconCart from '@iconify-icons/mdi/cart-outline';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  icons = {
    brand: iconChessKing,
    search: iconSearch,
    cart: iconCart
  };
}