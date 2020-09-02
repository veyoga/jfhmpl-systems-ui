import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { SESSION_STORAGE } from '../constants/session.constants';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserDetails } from './user-details.interface';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private apiBaseUrl = environment.apiBaseUrl;
  private userDetails: UserDetails;
  constructor(private _http: HttpClient, private _sessionService: SessionService) {
    this.userDetails = this._sessionService.getItem(SESSION_STORAGE.currentUser);
  }
  public login(payLodData: any): Observable<any> {
    const url = this.apiBaseUrl + '/user/login';
    return this._http.post<any>(url, { ...payLodData }, this.requestheader(false));
  }
  private requestheader(authorization: boolean = true) {
    let authHttpHeader;
    if (!authorization) {
      authHttpHeader = {
        'Content-Type': 'application/json'
      }
    } else {
      const tokenId = this.userDetails.tokenId;
      authHttpHeader = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenId
      }
    }
    const httpOptions = {
      headers: new HttpHeaders(authHttpHeader)
    };
    return httpOptions;
  }
}
