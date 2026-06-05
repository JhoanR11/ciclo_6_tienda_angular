import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import iconChessKing from '@iconify-icons/mdi/chess-king';
import iconSearch from '@iconify-icons/mdi/magnify';
import iconCart from '@iconify-icons/mdi/cart-outline';
import iconUser from '@iconify-icons/mdi/account-outline';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  searchFocused = signal(false);

  icons = {
    brand: iconChessKing,
    search: iconSearch,
    cart: iconCart,
    user: iconUser
  };
}