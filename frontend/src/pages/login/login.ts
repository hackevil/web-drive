import { Component } from '@angular/core';
import {IonicPage, NavController, Loading, LoadingController} from 'ionic-angular';
import {AuthServiceProvider, Credentials} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loading: Loading;
  private credentials: Credentials = {email: "", password: "", remember: false};

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider,
              private loadingCtrl: LoadingController) {
  }

  public login() {
    this.auth.login(this.credentials).subscribe(result => {

    });
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
