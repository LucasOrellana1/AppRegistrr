import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterDocentePage } from './register-docente.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterDocentePageRoutingModule {}
