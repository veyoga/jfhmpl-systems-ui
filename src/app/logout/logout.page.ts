import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { SESSION_STORAGE } from '../constants/session.constants';
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private _sessionService: SessionService,
    private _router: Router,
    private _httpServiceService: HttpServiceService) { }

  ngOnInit() {
    this._sessionService.removeItem(SESSION_STORAGE.currentUser);
    this._httpServiceService.setUserProfile(true);
    this._router.navigate(['/login']);
  }

}
