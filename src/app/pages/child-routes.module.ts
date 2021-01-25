import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Busquedas' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
  { path: 'chart', component: Grafica1Component, data: { title: 'Chart' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
  { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'rxjs' } },
  { path: 'perfil', component: PerfilComponent, data: { title: 'User Profile' } },

  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { title: 'Medicos' } },

  // Rutas de admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { title: 'Usuarios' } },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule { }
