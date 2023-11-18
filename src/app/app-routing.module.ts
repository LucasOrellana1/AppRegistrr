import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate , redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { ProfesorGuardGuard } from './guards/profesor-guard.guard';
import { AlumnoGuardGuard } from './guards/alumno-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(() => redirectLoggedInTo(['/inicio']))

 
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
    
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule),
    ...canActivate(() => redirectUnauthorizedTo([''])), canActivate: [AlumnoGuardGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    ...canActivate(() => redirectUnauthorizedTo([''])), canActivate: [AlumnoGuardGuard]
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule),
    ...canActivate(() => redirectUnauthorizedTo(['']))
  },

  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule),
    ...canActivate(() => redirectUnauthorizedTo([''])), canActivate: [AlumnoGuardGuard]

  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/qr/qr.module').then( m => m.QRPageModule),
    canActivate: [ProfesorGuardGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    ...canActivate(() => redirectUnauthorizedTo([''])), canActivate: [AlumnoGuardGuard]

  },

  {
    path: 'update',
    loadChildren: () => import('./pages/update/update.module').then( m => m.UpdatePageModule),
    ...canActivate(() => redirectUnauthorizedTo([''])), canActivate: [AlumnoGuardGuard]

  },
  {
    path: 'update-pass',
    loadChildren: () => import('./pages/update-pass/update-pass.module').then( m => m.UpdatePassPageModule),
    ...canActivate(() => redirectUnauthorizedTo([''])), canActivate: [AlumnoGuardGuard]

  },
  {
    path: 'profesor',
    loadChildren: () => import('./pages/profesor/profesor.module').then( m => m.ProfesorPageModule),

  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
