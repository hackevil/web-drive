import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthServiceProvider, User} from "../../providers/auth-service/auth-service";
import {DataServiceProvider, PageState} from "../../providers/data-service/data-service";


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public activePage = "DrivePage";
  private currentUser: User;

  constructor(private auth: AuthServiceProvider, private data: DataServiceProvider,
              public navCtrl: NavController) {
    this.currentUser = this.auth.authUser;
  }

  goToTrash() {
    this.data.state = PageState.DELETED;
    this.data.selected.clear();
  }

  goToFiles() {
    this.data.state = PageState.FILES;
    this.data.selected.clear();
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot("WelcomePage");
  }

  ionViewDidLoad() {
    this.goToFiles();
    const subscription = this.auth.isAuthenticated().subscribe(hasToken => {
      subscription.unsubscribe();
      if (hasToken === true) {
        // Load user from server.
        this.currentUser = this.auth.loadAuthenticatedUser();
      } else {
        this.logout();
      }
    });
  }
}
