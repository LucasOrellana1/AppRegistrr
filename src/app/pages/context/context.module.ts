import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContextPageRoutingModule } from './context-routing.module';

import { ContextPage } from './context.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContextPageRoutingModule
  ],
  declarations: [ContextPage]
})
export class ContextPageModule {}
