import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterDocentePageRoutingModule } from './register-docente-routing.module';

import { RegisterDocentePage } from './register-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterDocentePageRoutingModule
  ],
  declarations: [RegisterDocentePage]
})
export class RegisterDocentePageModule {}
