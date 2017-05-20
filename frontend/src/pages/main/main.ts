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
              public navCtrl: NavController, ) {
    this.activePage = "DrivePage";
    this.currentUser = this.auth.getAuthenticatedUser();
    this.goToFiles();
  }

  goToTrash() {
    this.data.state = PageState.DELETED;
    //TODO: clear selected
  }

  goToFiles() {
    this.data.state = PageState.FILES;
    //TODO: clear selected
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot("WelcomePage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
