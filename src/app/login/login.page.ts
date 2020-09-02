import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpServiceService } from '../services/http-service.service';
import { LoadingController, ToastController } from '@ionic/angular';
import * as _ from 'lodash';
import { SessionService } from '../services/session.service';
import { SESSION_STORAGE } from '../constants/session.constants';
import { UserDetails } from '../services/user-details.interface';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private _httpService: HttpServiceService,
    private _sessionService: SessionService,
    private _router: Router,
  private _toastService:ToastService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      customer_id: ['', [Validators.required]],
      pin: ['', Validators.required]
    });
  }
  public login(): void {
    if (this.loginForm.status === 'VALID') {
      this._httpService.login(this.loginForm.value).subscribe(async (res) => {
        const statusCode = _.get(res, 'statusCode');
        if (statusCode === '0000') {
          const tokenId = _.get(res, 'token');
          const customer_name = _.get(res, 'customer_name');
          const userDetails: UserDetails = {
            tokenId: tokenId,
            customerName: customer_name
          }
          this._sessionService.setItem(SESSION_STORAGE.currentUser, userDetails);
          this._router.navigate(['/purchase-history']);
        } else {
          const msg=_.get(res,'msg');
          this._toastService.present(msg);
        }
      });
    }
  }

}