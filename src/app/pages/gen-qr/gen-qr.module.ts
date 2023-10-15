import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenQrPageRoutingModule } from './gen-qr-routing.module';

import { GenQrPage } from './gen-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenQrPageRoutingModule
  ],
  declarations: [GenQrPage]
})
export class GenQrPageModule {}
