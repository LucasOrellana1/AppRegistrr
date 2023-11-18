import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraPageRoutingModule } from './camara-routing.module';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { CamaraPage } from './camara.page';

import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [CamaraPage]
})
export class CamaraPageModule {}
