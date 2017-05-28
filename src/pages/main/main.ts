import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {AuthServiceProvider, User} from "../../providers/auth-service/auth-service";
import {DataServiceProvider, PageState} from "../../providers/data-service/data-service";

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  @ViewChild('fileInput') fileInput;

  public activePage = "DrivePage";
  private currentUser: User;
  private loading: Loading;

  constructor(private auth: AuthServiceProvider, private data: DataServiceProvider,
              public navCtrl: NavController, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
    this.currentUser = this.auth.authUser;
  }

  goToTrash() {
    this.data.state = PageState.DELETED;
    this.transitionPage();
    this.data.loadTrash();
    this.stopLoading();
  }

  goToFiles() {
    this.data.state = PageState.FILES;
    this.transitionPage();
    this.data.enterFolder(-1);
    this.stopLoading();
  }

  private transitionPage() {
    this.startLoading();
    this.data.clearSelected();
    this.data.currentFolder.folders = [];
    this.data.currentFolder.files = [];
    this.data.folderLevels = [];
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


  chooseFiles() {
    let event: MouseEvent = new MouseEvent('click', {bubbles: false});
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  fileInputChangeEvent() {
    const inputElement: HTMLInputElement = this.fileInput.nativeElement;
    let count: number = inputElement.files.length;
    let formData = new FormData();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        formData.append('files[]', inputElement.files.item(i));
      }
      let folderId = this.data.currentFolder.id;
      if (!folderId) folderId = -1;
      formData.set("folderId", folderId.toString());
      this.data.uploadFiles(formData).subscribe(result => {
        if (result.success === true) {
          this.currentUser.usage = parseFloat(result.usage);
          if (this.data.state === PageState.FILES) {
            this.data.refreshFolder(folderId);
          }
          if (result.failed) {
            this.displayWarning("Error uploading " + result.count +
                " file(s).", "Some files types are not supported.")
          }
        }
        if (result.success === false) {
          this.displayWarning("Failed to upload files.", "Please check your connection.")
        }
        inputElement.value = null;
      });
    }
  }

  private displayWarning(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot("WelcomePage");
  }

  ionViewDidLoad() {
    this.auth.isAuthenticated().then(hasToken => {
      if (hasToken === true) {
        this.auth.loadAuthenticatedUser().subscribe(
            result => this.currentUser = this.auth.authUser
        );
      } else {
        this.logout();
      }
    });
  }
}
