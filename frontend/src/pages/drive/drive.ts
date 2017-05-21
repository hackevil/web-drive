import { Component } from '@angular/core';
import {AlertController, IonicPage, PopoverController} from 'ionic-angular';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-drive',
  templateUrl: 'drive.html'
})
export class DrivePage {

  private currentFolder;
  private selected;
  public searchText = "";

  constructor(private popoverCtrl: PopoverController, private data: DataServiceProvider,
              private alertCtrl: AlertController, private auth: AuthServiceProvider) {
    this.currentFolder = this.data.currentFolder;
    this.selected = this.data.selected;
  }

  updateSelectedItems(id) {
    (this.selected.has(id) === false) ? this.selected.add(id) : this.selected.delete(id);
  }

  enterFolder(folderId: number, parentId?: number, ) {
    this.data.enterFolder(folderId, parentId);
  }

  exitFolder() {
    this.data.exitFolder();
  }

  renameItem() {
    const selectItemId = this.selected.values().next().value;
    let prompt = this.alertCtrl.create({
      title: 'Rename',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            if (data.name === "") return false;
            let promptHide = prompt.dismiss();
            promptHide.then(() => {
              // Show spinner
              this.data.renameItem(selectItemId, data.name);
              // hide spinner
              // clear selected
            });
            return false;
          }
        }
      ]
    });
    prompt.present();
  }

  deleteItems() {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete these items?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
          }
        }
      ]
    });
    alert.present();
  }

  downloadItems() {
  }

  shareItems() {
  }

  clearSelected() {
    this.selected.clear();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create("PopoverOptionsPage");
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    const subscription = this.auth.isAuthenticated().subscribe(hasToken => {
      if (hasToken === true) {
        subscription.unsubscribe();
        this.data.enterFolder(-1);
      }
    });
  }
}
