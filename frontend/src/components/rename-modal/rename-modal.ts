import { Component } from '@angular/core';
import {ViewController} from "ionic-angular";

@Component({
  selector: 'rename-modal',
  templateUrl: 'rename-modal.html'
})
export class RenameModalComponent {

  constructor(
    public viewCtrl: ViewController
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
