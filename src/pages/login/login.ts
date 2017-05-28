import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, Loading, LoadingController, AlertController, Navbar} from 'ionic-angular';
import {AuthServiceProvider, Credentials} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild(Navbar) navBar: Navbar;

  private loading: Loading;
  private credentials: Credentials = {email: "", password: "", remember: false};

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  public login() {
    this.toggleLoading();
    const subscription = this.auth.login(this.credentials).subscribe(result => {
      if (result.success === true) {
        this.loading.dismiss().then(() => {
          subscription.unsubscribe();
          this.navCtrl.setRoot("MainPage");
        });
      } else {
        this.showError();
      }
    });
  }

  public toggleLoading() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: "Loading..."
    });
    this.loading.present();
  }

  showError() {
    const alert = this.alertCtrl.create({
      title: 'Failed',
      subTitle: 'Please check your credentials',
      buttons: ['ok']
    });
    this.loading.dismiss().then(() => {
      alert.present();
    });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent) => {
      this.navCtrl.setRoot("WelcomePage")
    };
    this.auth.isAuthenticated().then(hasToken => {
      if (hasToken === true) {
        this.navCtrl.setRoot("MainPage");
      }
    })
  }

}
