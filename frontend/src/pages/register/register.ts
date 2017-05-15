import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private user = {name: "", email: "", password: "", confirm: ""};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public register() {
    this.navCtrl.setRoot("MainPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
