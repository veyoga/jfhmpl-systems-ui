import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseHistoryPageRoutingModule } from './purchase-history-routing.module';

import { PurchaseHistoryPage } from './purchase-history.page';
import { PurchaseDatePipe } from '../shared/pipes/purchase-date.pipe';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseHistoryPageRoutingModule,
    SharedModule
  ],
  declarations: [PurchaseHistoryPage]
})
export class PurchaseHistoryPageModule {}
