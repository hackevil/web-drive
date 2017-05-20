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

  private activePage;
  private currentUser: User;

  constructor(private auth: AuthServiceProvider, private data: DataServiceProvider,
              public navCtrl: NavController) {
    this.activePage = "DrivePage";
    this.currentUser = this.auth.getAuthenticatedUser();
    this.goToFiles();
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

  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      this.auth.isAuthenticated()
        .subscribe(authorised => {
          authorised ? resolve() : reject('Not authorised')
        });
    });
  }
}
