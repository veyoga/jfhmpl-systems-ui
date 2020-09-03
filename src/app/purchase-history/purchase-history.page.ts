import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ToastService } from '../services/toast.service';
import { PurchaseHistory } from '../services/purchase-history.interface';
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
})
export class PurchaseHistoryPage implements OnInit, OnDestroy {
  historyService:Subscription;
  purchaseHistory:PurchaseHistory[]=[];
  constructor(private _httpService: HttpServiceService,
  private _toastService:ToastService) { }

  ngOnInit() {
    this.historyService=this._httpService.getPurchaseHistory().subscribe((res)=>{
      const statusCode=_.get(res,'statusCode');
      if(statusCode==='0000'){
        this.purchaseHistory=_.get(res,'history',[]);
      }else{
        const msg = _.get(res, 'msg');
          this._toastService.present(msg);
      }
    });
  }
  ngOnDestroy(){
    this.historyService.unsubscribe();
  }

}
