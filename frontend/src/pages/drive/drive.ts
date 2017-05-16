import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-drive',
  templateUrl: 'drive.html'
})
export class DrivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create("PopoverOptionsPage");
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrivePage');
  }

}
