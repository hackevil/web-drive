import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popover-options',
  templateUrl: 'popover-options.html',
})
export class PopoverOptionsPage {

  private parent;

  constructor(public viewCtrl: ViewController, private params: NavParams) {
    this.parent = this.params.get("parent");
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
