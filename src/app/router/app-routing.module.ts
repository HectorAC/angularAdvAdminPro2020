import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from '../pages/pages.routing';

import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { AuthRoutingModule } from '../auth/auth.routing';

const routes: Routes = [
  // Rutas ya cogidas
  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting

  // Redireccion con slash vacío
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Cualquier otra ruta no definida lo lleva a una página notFound
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
