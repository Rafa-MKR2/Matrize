import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { CarApiService } from './car-api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _oneSignal : OneSignal, 
    public service : CarApiService
  ) {
    this.initializeApp();

    this.service.updateState().subscribe(item=>{
      this._oneSignal.startInit('1cd5f9d4-6360-46ca-ac50-937e9339542f','54950511803')
    })

    this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.InAppAlert);

    this._oneSignal.handleNotificationReceived().subscribe((note: OSNotification)=>{
      let notification = note.payload.additionalData;
    this.service.updateState().subscribe(item=>{
      console.log(item)
    })

    })
    this._oneSignal.endInit()
  

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
