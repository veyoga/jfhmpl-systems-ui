import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpServiceService } from './services/http-service.service';
import { SessionService } from './services/session.service';
import { UserDetails } from './services/user-details.interface';
import { SESSION_STORAGE } from './constants/session.constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  /*public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];*/
  public appPages = [
    {
      title: 'Purchase History',
      url: '/purchase-history',
      icon: 'archive'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
    }
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public labels = [];
  public userDetails: UserDetails;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _httpServiceService: HttpServiceService,
    private _sessionService: SessionService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.userDetails = this._sessionService.getItem(SESSION_STORAGE.currentUser);
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this._httpServiceService.getUserProfile().subscribe((res) => {
      if (res) {
        this.userDetails = this._sessionService.getItem(SESSION_STORAGE.currentUser);
      } else {

      }
    });
  }
}
