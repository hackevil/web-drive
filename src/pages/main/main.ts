import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
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

  constructor(private auth: AuthServiceProvider, private data: DataServiceProvider,
              public navCtrl: NavController) {
    this.currentUser = this.auth.authUser;
  }

  goToTrash() {
    this.data.state = PageState.DELETED;
    this.transitionPage();
  }

  goToFiles() {
    this.data.state = PageState.FILES;
    this.transitionPage();
  }

  private transitionPage() {
    this.data.clearSelected();
    this.data.currentFolder.folders = [];
    this.data.currentFolder.files = [];
    this.data.folderLevels = [];
    this.data.enterFolder(-1);
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
      const folderId = this.data.currentFolder.id;
      formData.set("folderId", folderId.toString());
      this.data.uploadFiles(formData).subscribe(result => {
        if (result.success === true) {
          this.data.refreshFolder(folderId);
        }
        inputElement.value = null;
      });
    }
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot("WelcomePage");
  }

  ionViewDidLoad() {
    this.goToFiles();
    const subscription = this.auth.isAuthenticated().subscribe(hasToken => {
      subscription.unsubscribe();
      if (hasToken === true) {
        // Load user from server.
        this.currentUser = this.auth.loadAuthenticatedUser();
      } else {
        this.logout();
      }
    });
  }
}
