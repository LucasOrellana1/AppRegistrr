import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './ingresado.guard';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { ProfesorGuard } from './profesor.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'context',
    loadChildren: () => import('./pages/context/context.module').then( m => m.ContextPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/context/context.module').then( m => m.ContextPageModule),
  },
  {
    path: 'gen-qr',
    loadChildren: () => import('./pages/gen-qr/gen-qr.module').then( m => m.GenQrPageModule),
    canActivate: [ProfesorGuard]

  },



  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
