import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public goToLogin() {
    this.navCtrl.push("LoginPage");
  }

  public goToRegister() {
    this.navCtrl.push("RegisterPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}