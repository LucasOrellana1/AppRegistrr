import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePassPageRoutingModule } from './update-pass-routing.module';

import { UpdatePassPage } from './update-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePassPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatePassPage]
})
export class UpdatePassPageModule {}
