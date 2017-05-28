import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, PopoverController} from 'ionic-angular';
import {DataServiceProvider, PageState} from "../../providers/data-service/data-service";
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
  private loading: Loading;

  constructor(private popoverCtrl: PopoverController, private data: DataServiceProvider,
              private alertCtrl: AlertController, private auth: AuthServiceProvider,
              private loadingCtrl: LoadingController) {
    this.currentFolder = this.data.currentFolder;
    this.selected = this.data.selected;
    this.selectedIds = this.data.selectedIds;
  }

  updateSelectedItems(item) {
    (this.selected.has(item) === false) ? this.selected.add(item) : this.selected.delete(item);
    (this.selectedIds.has(item.id) === false) ? this.selectedIds.add(item.id) : this.selectedIds.delete(item.id);
  }

  enterFolder(folderId: number, parentId?: number, ) {
    if (this.data.state === PageState.DELETED) {
      let alert = this.alertCtrl.create({
        title: 'This folder is in your trash',
        subTitle: 'To view this folder you must restore it.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    if (this.data.state === PageState.FILES) {
      this.data.enterFolder(folderId, parentId);
    }
  }

  public startLoading() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
      content: "Loading..."
    });
    this.loading.present();
  }

  private stopLoading() {
    this.loading.dismiss();
  }

  private displayWarning(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  createFolder() {
    let prompt = this.alertCtrl.create({
      title: 'Create Folder',
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
            prompt.dismiss().then(() => {
              this.startLoading();
              const currentFolderId = this.currentFolder.id;
              this.data.createFolder(currentFolderId, data.name).subscribe(result => {
                if (result.success === true) {
                  this.data.refreshFolder(currentFolderId);
                } else {
                  this.displayWarning("Error creating folder.", "Please check your connection.");
                }
                this.stopLoading();
              });
            });
            return false;
          }
        }
      ]
    });
    prompt.present();
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
              this.startLoading();
              const currentFolderId = this.data.currentFolder.id;
              this.data.renameItem(selectedItem, data.name).subscribe(result => {
                if (result.success === true) {
                  this.data.refreshFolder(currentFolderId);
                } else {
                  this.displayWarning("Error renaming file.", "Please check your connection.");
                }
                this.stopLoading();
              });
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
      subTitle: 'Are you sure you want to continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            alert.dismiss().then(() => {
              this.startLoading();
              const currentFolderId = this.data.currentFolder.id;
              this.data.deleteItems(this.selected).subscribe(result => {
                if (result.success === true) {
                  this.data.refreshFolder(currentFolderId);
                } else {
                  this.displayWarning("Error deleting your files.", "Please check your connection.");
                }
                this.stopLoading();
              },
              error => this.displayWarning("Error deleting your files", "Check your connection"));
            });
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  restoreItems() {
    let alert = this.alertCtrl.create({
      title: 'Confirm restore',
      subTitle: 'Are you sure you want to continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Restore',
          handler: () => {
            alert.dismiss().then(() => {
              this.startLoading();
              this.data.restoreItems(this.selected).subscribe(result => {
                if (result.success === true) {
                  this.data.loadTrash();
                } else {
                  this.displayWarning("Error restoring your files.", "Please try again.");
                }
                this.stopLoading();
              });
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

  presentPopover(event) {
    let popover = this.popoverCtrl.create("PopoverOptionsPage", {parent: this});
    popover.present({
      ev: event
    });
  }

  ionViewDidLoad() {
    this.auth.isAuthenticated().then(hasToken => {
      if (hasToken === true) {
        this.startLoading();
        this.data.enterFolder(-1, null,
            () => this.displayWarning("Unable to load your drive.", "Please check your connection"));
        this.stopLoading();
      }
    });
  }
}
