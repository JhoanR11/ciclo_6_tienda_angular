import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productos/:id',
    renderMode: RenderMode.Client // <-- Cambia 'mode' por 'renderMode'
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender // <-- Aquí también
  }
];
