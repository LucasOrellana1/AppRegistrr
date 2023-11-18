import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRPageRoutingModule } from './qr-routing.module';

import { QRPage } from './qr.page';

import { QRCodeModule } from 'angularx-qrcode';


//https://www.npmjs.com/package/angularx-qrcode
//npm install angularx-qrcode
//Si sale un mensaje de error correr este comando 
//npm i --save-dev @types/qrcode con el servidor apagador

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    QRPageRoutingModule
  ],
  declarations: [QRPage]
})
export class QRPageModule {}
