import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Loading, LoadingController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loading: Loading;
  private user = {email: "", password: "", remember: false};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingCtrl: LoadingController) {
  }

  public login() {
    this.navCtrl.setRoot("MainPage");
  }

  public toggleLoading() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: "Loading..."
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
