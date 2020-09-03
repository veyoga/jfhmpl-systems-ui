import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { SESSION_STORAGE } from '../constants/session.constants';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserDetails } from './user-details.interface';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private apiBaseUrl = environment.apiBaseUrl;
  private userProfile = new BehaviorSubject(false);
  constructor(private _http: HttpClient, private _sessionService: SessionService) { }
  public login(payLodData: any): Observable<any> {
    const url = this.apiBaseUrl + '/user/login';
    return this._http.post<any>(url, { ...payLodData }, this.requestheader(false));
  }
  public getPurchaseHistory(byDate?: string): Observable<any> {
    const userDetails = <UserDetails>this._sessionService.getItem(SESSION_STORAGE.currentUser);
    let url = this.apiBaseUrl + '/purchase-history/' + userDetails.customerId;
    if (byDate) {
      url = url + '/' + byDate;
    }
    return this._http.post<any>(url, {}, this.requestheader());
  }

  public setUserProfile(flag: boolean): void {
    this.userProfile.next(flag);
  }
  public getUserProfile(): Observable<boolean> {
    return this.userProfile;
  }
  private requestheader(authorization: boolean = true) {
    let authHttpHeader;
    if (!authorization) {
      authHttpHeader = {
        'Content-Type': 'application/json'
      };
    } else {
      const userDetails = <UserDetails>this._sessionService.getItem(SESSION_STORAGE.currentUser);
      const tokenId = userDetails.tokenId;
      authHttpHeader = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenId
      };
    }
    const httpOptions = {
      headers: new HttpHeaders(authHttpHeader)
    };
    return httpOptions;
  }
}
