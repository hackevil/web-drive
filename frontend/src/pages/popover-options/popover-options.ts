import { Component } from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popover-options',
  templateUrl: 'popover-options.html',
})
export class PopoverOptionsPage {

  constructor(public viewCtrl: ViewController) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverOptionsPage');
  }

}
