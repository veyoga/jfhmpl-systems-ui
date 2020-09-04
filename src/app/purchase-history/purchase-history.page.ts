import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ToastService } from '../services/toast.service';
import { PurchaseHistory } from '../services/purchase-history.interface';
import * as moment from 'moment';
import { MenuController } from '@ionic/angular';
import { HistoryDetails } from '../services/history-details.interface';
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
})
export class PurchaseHistoryPage implements OnInit, OnDestroy {
  historyService: Subscription;
  historyServiceByDateSub: Subscription;
  purchaseHistory: PurchaseHistory[] = [];
  historyDetails: HistoryDetails;
  selectedItem = {};
  constructor(private _httpService: HttpServiceService,
    private _toastService: ToastService, private _menuController: MenuController) { }

  ngOnInit() {
    this.historyService = this._httpService.getPurchaseHistory().subscribe((res) => {
      const statusCode = _.get(res, 'statusCode');
      if (statusCode === '0000') {
        this.purchaseHistory = _.get(res, 'history', []);
      } else {
        const msg = _.get(res, 'msg');
        this._toastService.present(msg);
      }
    });
  }
  onHistoryClick(history: PurchaseHistory) {
    const purchase_date = _.get(this.selectedItem, 'purchase_date');
    if (purchase_date === history.purchase_date) {
      const expanded = _.get(this.selectedItem, 'expanded');
      this.selectedItem = {
        purchase_date: purchase_date,
        expanded: !expanded
      }
      const expandedFlag = _.get(this.selectedItem, 'expanded');
      if (expandedFlag) {
        const orderDate = moment(history.purchase_date).format('YYYY-MM-DD');
        this.historyServiceByDate(orderDate);
      }
    } else {
      this.selectedItem = {
        purchase_date: history.purchase_date,
        expanded: true
      }
      const orderDate = moment(history.purchase_date).format('YYYY-MM-DD');
      this.historyServiceByDate(orderDate);
    }
  }
  historyServiceByDate(orderDate: string) {
    this.historyDetails = null;
    this.historyServiceByDateSub = this._httpService.getPurchaseHistory(orderDate).subscribe((res) => {
      const statusCode = _.get(res, 'statusCode');
      if (statusCode === '0000') {
        this.historyDetails = _.get(res, 'historyDetails', []);
      } else {
        const msg = _.get(res, 'msg');
        this._toastService.present(msg);
      }
    });
  }
  openSideMenu() {
    this._menuController.open();
  }
  ngOnDestroy() {
    this.historyService.unsubscribe();
  }

}
