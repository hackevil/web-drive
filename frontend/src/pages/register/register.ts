import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, Navbar, NavController} from 'ionic-angular';
import {AuthServiceProvider, Registration} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild(Navbar) navBar: Navbar;

  private loading: Loading;
  private registration: Registration = {name: "", email: "", password: "", password_confirmation: ""};
  private errors: Map<string, string> = new Map();

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  public register() {
    this.toggleLoading();
    this.errors.clear();
    this.auth.register(this.registration).subscribe(result => {
      if (result.success === true) {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot("MainPage");
        });
      } else {
        if (result.errors) {
          this.loading.dismiss();
          this.setErrors(result.errors);
        } else {
          this.showError();
        }
      }
    });
  }

  private setErrors(errors) {
    if (errors.name) this.errors.set("name", errors.name);
    if (errors.email) this.errors.set("email", errors.email);
    if (errors.password) {
      this.errors.set("password", errors.password[0]);
      if (errors.password.length === 2) this.errors.set("confirmation", errors.password[1]);
    }
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
      subTitle: 'An error occurred while registering.',
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
    this.auth.isAuthenticated().subscribe(hasToken => {
      if (hasToken === true) {
        this.navCtrl.setRoot("MainPage");
      }
    })
  }
}
