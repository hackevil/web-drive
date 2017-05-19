import { Component } from '@angular/core';
import {AlertController, IonicPage, PopoverController} from 'ionic-angular';
import {DataServiceProvider} from "../../providers/data-service/data-service";
import {AuthServiceProvider, User} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-drive',
  templateUrl: 'drive.html'
})
export class DrivePage {

  private currentFolder;
  private currentUser: User;
  private selected: Set<string> = new Set();
  public searchText = "";

  constructor(private popoverCtrl: PopoverController, private data: DataServiceProvider,
              private alertCtrl: AlertController, private auth: AuthServiceProvider) {
    this.currentFolder = this.data.currentFolder;
    this.currentUser = this.auth.getAuthenticatedUser();
  }

  updateSelectedItems(id) {
    (this.selected.has(id) === false) ? this.selected.add(id) : this.selected.delete(id);
  }

  enterFolder(parentId: string, folderId: string) {
    if (this.data.folders.has(folderId)) {
      const newFolder = this.data.folders.get(folderId);
      this.setCurrentFolder(newFolder);
      this.data.folderLevels.push(parentId);
    }
  }

  exitFolder() {
    this.selected.clear();
    const parentId = this.data.folderLevels.pop();
    const newFolder = this.data.folders.get(parentId);
    this.setCurrentFolder(newFolder);
  }

  private setCurrentFolder(newFolder) {
    this.selected.clear();
    this.data.currentFolder.folders = newFolder.folders;
    this.data.currentFolder.files = newFolder.files;

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
    console.log('ionViewDidLoad DrivePage');
  }

}
