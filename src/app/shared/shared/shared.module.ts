import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseDatePipe } from '../pipes/purchase-date.pipe';

@NgModule({
  declarations: [PurchaseDatePipe],
  imports: [
    CommonModule
  ],
  exports:[PurchaseDatePipe]
})
export class SharedModule { }
