import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenQrPage } from './gen-qr.page';

const routes: Routes = [
  {
    path: '',
    component: GenQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenQrPageRoutingModule {}
