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
  public searchText = "";

  private selected;
  private selectedIds;

  constructor(private popoverCtrl: PopoverController, private data: DataServiceProvider,
              private alertCtrl: AlertController, private auth: AuthServiceProvider) {
    this.currentFolder = this.data.currentFolder;
    this.selected = this.data.selected;
    this.selectedIds = this.data.selectedIds;
  }

  updateSelectedItems(item) {
    (this.selected.has(item) === false) ? this.selected.add(item) : this.selected.delete(item);
    (this.selectedIds.has(item.id) === false) ? this.selectedIds.add(item.id) : this.selectedIds.delete(item.id);
  }

  enterFolder(folderId: number, parentId?: number, ) {
    this.data.enterFolder(folderId, parentId);
  }

  createFolder() {
    const currentFolderId = this.currentFolder.id;
    this.data.createFolder(currentFolderId, "test").subscribe(result => {
      this.data.refreshFolder(currentFolderId);
    });
  }

  exitFolder() {
    this.data.exitFolder();
  }

  renameItem() {
    const selectedItem = this.selected.values().next().value;
    let prompt = this.alertCtrl.create({
      title: 'Rename',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: selectedItem.name
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
            prompt.dismiss().then(() => {
              // Show spinner
              const currentFolderId = this.data.currentFolder.id;
              this.data.renameItem(selectedItem, data.name).subscribe(result => {
                if (result.success === true) {
                  this.data.refreshFolder(currentFolderId);
                }
              });
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
            alert.dismiss().then(() => {
              // Show spinner
              const currentFolderId = this.data.currentFolder.id;
              this.data.deleteItems(this.selected).subscribe(result => {
                if (result.success === true) {
                  this.data.refreshFolder(currentFolderId);
                }
              });
              // hide spinner
              // clear selected
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  downloadItem() {
    const selectedItem = this.selected.values().next().value;
    this.data.downloadItem(selectedItem).subscribe(result => {
      if (result.success === true) this.data.clearSelected();
    });
  }

  shareItems() {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create("PopoverOptionsPage");
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    console.log("ENTERING DRIVE");
    const subscription = this.auth.isAuthenticated().subscribe(hasToken => {
      if (hasToken === true) {
        subscription.unsubscribe();
        this.data.enterFolder(-1);
      }
    });
  }
}
