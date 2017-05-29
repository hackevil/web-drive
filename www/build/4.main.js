webpackJsonp([4],{

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main__ = __webpack_require__(292);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainPageModule", function() { return MainPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MainPageModule = (function () {
    function MainPageModule() {
    }
    return MainPageModule;
}());
MainPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__main__["a" /* MainPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__main__["a" /* MainPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__main__["a" /* MainPage */]
        ]
    })
], MainPageModule);

//# sourceMappingURL=main.module.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__ = __webpack_require__(202);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MainPage = (function () {
    function MainPage(auth, data, navCtrl, loadingCtrl, alertCtrl) {
        this.auth = auth;
        this.data = data;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.activePage = "DrivePage";
        this.currentUser = this.auth.authUser;
    }
    MainPage.prototype.goToTrash = function () {
        var _this = this;
        this.data.state = __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__["b" /* PageState */].DELETED;
        this.transitionPage();
        this.data.loadTrash(function () { return _this.displayWarning("Unable to load your drive.", "Please check your connection"); });
        this.stopLoading();
    };
    MainPage.prototype.goToFiles = function () {
        var _this = this;
        this.data.state = __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__["b" /* PageState */].FILES;
        this.transitionPage();
        this.data.enterFolder(-1, null, function () { return _this.displayWarning("Unable to load your drive.", "Please check your connection"); });
        this.stopLoading();
    };
    MainPage.prototype.transitionPage = function () {
        this.startLoading();
        this.data.clearSelected();
        this.data.currentFolder.folders = [];
        this.data.currentFolder.files = [];
        this.data.folderLevels = [];
    };
    MainPage.prototype.startLoading = function () {
        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            content: "Loading..."
        });
        this.loading.present();
    };
    MainPage.prototype.stopLoading = function () {
        this.loading.dismiss();
    };
    MainPage.prototype.chooseFiles = function () {
        var event = new MouseEvent('click', { bubbles: false });
        this.fileInput.nativeElement.dispatchEvent(event);
    };
    MainPage.prototype.fileInputChangeEvent = function () {
        var _this = this;
        this.startLoading();
        var inputElement = this.fileInput.nativeElement;
        var count = inputElement.files.length;
        var formData = new FormData();
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                formData.append('files[]', inputElement.files.item(i));
            }
            var folderId_1 = this.data.currentFolder.id;
            if (!folderId_1)
                folderId_1 = -1;
            formData.set("folderId", folderId_1.toString());
            this.data.uploadFiles(formData).subscribe(function (result) {
                if (result.success === true) {
                    _this.currentUser.usage = parseFloat(result.usage);
                    if (_this.data.state === __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__["b" /* PageState */].FILES) {
                        _this.data.refreshFolder(folderId_1);
                    }
                    if (result.failed) {
                        _this.displayWarning("Error uploading " + result.count +
                            " file(s).", "Some files types are not supported.");
                    }
                }
                if (result.success === false) {
                    _this.displayWarning("Failed to upload files.", "Please check your connection.");
                }
                _this.stopLoading();
                inputElement.value = null;
            });
        }
    };
    MainPage.prototype.displayWarning = function (title, subTitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    MainPage.prototype.logout = function () {
        this.auth.logout();
        this.navCtrl.setRoot("WelcomePage");
    };
    MainPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.auth.isAuthenticated().then(function (hasToken) {
            if (hasToken === true) {
                _this.auth.loadAuthenticatedUser().subscribe(function (result) { return _this.currentUser = _this.auth.authUser; });
            }
            else {
                _this.logout();
            }
        });
    };
    return MainPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('fileInput'),
    __metadata("design:type", Object)
], MainPage.prototype, "fileInput", void 0);
MainPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-main',template:/*ion-inline-start:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\main\main.html"*/'<ion-header>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-split-pane>\n\n    <ion-menu [content]="content">\n\n      <ion-header>\n\n        <ion-toolbar>\n\n          <ion-title>Web Drive</ion-title>\n\n        </ion-toolbar>\n\n      </ion-header>\n\n      <ion-content>\n\n        <ion-list>\n\n          <button (tap)="goToFiles()" ion-item>\n\n            <ion-icon name="document" item-left></ion-icon>My Files\n\n            <ion-icon *ngIf="data.state === 5" name="star-half" item-right></ion-icon>\n\n          </button>\n\n          <!--<button ion-item disabled>-->\n\n            <!--<ion-icon name="share" item-left></ion-icon>Shared-->\n\n            <!--<ion-icon *ngIf="data.state === 10" name="star-half" item-right></ion-icon>-->\n\n          <!--</button>-->\n\n          <button (tap)="goToTrash()" ion-item>\n\n            <ion-icon name="trash" item-left></ion-icon>Trash\n\n            <ion-icon *ngIf="data.state === 15" name="star-half" item-right></ion-icon>\n\n          </button>\n\n          <button (tap)="chooseFiles()" ion-item>\n\n            <ion-icon name="cloud-upload" item-left></ion-icon>Upload\n\n            <input #fileInput (change)="fileInputChangeEvent()" type="file" accept="*" id="uploaded" multiple/>\n\n          </button>\n\n          <button (tap)="logout()" ion-item>\n\n            <ion-icon name="exit" item-left></ion-icon>Logout\n\n          </button>\n\n        </ion-list>\n\n\n\n        <div *ngIf="currentUser" id="usage-wrapper">\n\n          <span>{{currentUser.usage}}MB out of {{currentUser.allocated}}MB used. ({{currentUser.usagePercent}}%)</span>\n\n          <div id="usage-container">\n\n            <div id="usage" [style.width.%]="currentUser.usagePercent"></div>\n\n          </div>\n\n        </div>\n\n\n\n      </ion-content>\n\n    </ion-menu>\n\n\n\n    <ion-nav [root]="activePage" main #content>\n\n    </ion-nav>\n\n  </ion-split-pane>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\main\main.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_data_service_data_service__["a" /* DataServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* AlertController */]])
], MainPage);

//# sourceMappingURL=main.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map