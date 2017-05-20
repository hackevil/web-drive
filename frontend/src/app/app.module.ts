import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ConnectionServiceProvider } from '../providers/connection-service/connection-service';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { IonicStorageModule } from '@ionic/storage';
import { RenameModalComponent } from '../components/rename-modal/rename-modal';
import {HttpModule} from "@angular/http";


@NgModule({
  declarations: [
    MyApp,
    RenameModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      locationStrategy: "path"
    }),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, RenameModalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ConnectionServiceProvider,
    DataServiceProvider
  ]
})
export class AppModule {}


// {
//   locationStrategy: 'path'
// }
