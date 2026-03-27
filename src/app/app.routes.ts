import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos').then(m => m.ProductosComponent)
  },
  {
    path: 'productos/:id',
    loadComponent: () => import('./pages/producto-detalle/producto-detalle').then(m => m.ProductoDetalleComponent)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./pages/carrito/carrito').then(m => m.CarritoComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent)
  },
  {
    path: 'pedido-confirmado',
    loadComponent: () => import('./pages/pedido-confirmado/pedido-confirmado').then(m => m.PedidoConfirmadoComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
