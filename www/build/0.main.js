webpackJsonp([0],{

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drive__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_filter_filter__ = __webpack_require__(298);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrivePageModule", function() { return DrivePageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DrivePageModule = (function () {
    function DrivePageModule() {
    }
    return DrivePageModule;
}());
DrivePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__drive__["a" /* DrivePage */],
            __WEBPACK_IMPORTED_MODULE_3__pipes_filter_filter__["a" /* FilterPipe */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__drive__["a" /* DrivePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__drive__["a" /* DrivePage */]
        ]
    })
], DrivePageModule);

//# sourceMappingURL=drive.module.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(201);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrivePage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DrivePage = (function () {
    function DrivePage(popoverCtrl, data, alertCtrl, auth, loadingCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.data = data;
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.loadingCtrl = loadingCtrl;
        this.searchText = "";
        this.currentFolder = this.data.currentFolder;
        this.selected = this.data.selected;
        this.selectedIds = this.data.selectedIds;
    }
    DrivePage.prototype.updateSelectedItems = function (item) {
        (this.selected.has(item) === false) ? this.selected.add(item) : this.selected.delete(item);
        (this.selectedIds.has(item.id) === false) ? this.selectedIds.add(item.id) : this.selectedIds.delete(item.id);
    };
    DrivePage.prototype.enterFolder = function (folderId, parentId) {
        if (this.data.state === __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__["b" /* PageState */].DELETED) {
            var alert_1 = this.alertCtrl.create({
                title: 'This folder is in your trash',
                subTitle: 'To view this folder you must restore it.',
                buttons: ['Dismiss']
            });
            alert_1.present();
        }
        if (this.data.state === __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__["b" /* PageState */].FILES) {
            this.data.enterFolder(folderId, parentId);
        }
    };
    DrivePage.prototype.startLoading = function () {
        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            content: "Loading..."
        });
        this.loading.present();
    };
    DrivePage.prototype.stopLoading = function () {
        this.loading.dismiss();
    };
    DrivePage.prototype.createFolder = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        if (data.name === "")
                            return false;
                        prompt.dismiss().then(function () {
                            _this.startLoading();
                            var currentFolderId = _this.currentFolder.id;
                            _this.data.createFolder(currentFolderId, data.name).subscribe(function (result) {
                                if (result.success === true) {
                                    _this.data.refreshFolder(currentFolderId);
                                }
                                _this.stopLoading();
                            });
                        });
                        return false;
                    }
                }
            ]
        });
        prompt.present();
    };
    DrivePage.prototype.exitFolder = function () {
        this.data.exitFolder();
    };
    DrivePage.prototype.renameItem = function () {
        var _this = this;
        var selectedItem = this.selected.values().next().value;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        if (data.name === "")
                            return false;
                        prompt.dismiss().then(function () {
                            _this.startLoading();
                            var currentFolderId = _this.data.currentFolder.id;
                            _this.data.renameItem(selectedItem, data.name).subscribe(function (result) {
                                if (result.success === true) {
                                    _this.data.refreshFolder(currentFolderId);
                                }
                                _this.stopLoading();
                            });
                        });
                        return false;
                    }
                }
            ]
        });
        prompt.present();
    };
    DrivePage.prototype.deleteItems = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            subTitle: 'Are you sure you want to continue?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Delete',
                    handler: function () {
                        alert.dismiss().then(function () {
                            _this.startLoading();
                            var currentFolderId = _this.data.currentFolder.id;
                            _this.data.deleteItems(_this.selected).subscribe(function (result) {
                                if (result.success === true) {
                                    _this.data.refreshFolder(currentFolderId);
                                }
                                _this.stopLoading();
                            });
                        });
                        return false;
                    }
                }
            ]
        });
        alert.present();
    };
    DrivePage.prototype.restoreItems = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm restore',
            subTitle: 'Are you sure you want to continue?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Restore',
                    handler: function () {
                        alert.dismiss().then(function () {
                            _this.startLoading();
                            _this.data.restoreItems(_this.selected).subscribe(function (result) {
                                if (result.success === true) {
                                    _this.data.loadTrash();
                                }
                                _this.stopLoading();
                            });
                        });
                        return false;
                    }
                }
            ]
        });
        alert.present();
    };
    DrivePage.prototype.downloadItem = function () {
        var _this = this;
        var selectedItem = this.selected.values().next().value;
        this.data.downloadItem(selectedItem).subscribe(function (result) {
            if (result.success === true)
                _this.data.clearSelected();
        });
    };
    DrivePage.prototype.shareItems = function () {
    };
    DrivePage.prototype.presentPopover = function (event) {
        var popover = this.popoverCtrl.create("PopoverOptionsPage", { parent: this });
        popover.present({
            ev: event
        });
    };
    DrivePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.auth.isAuthenticated().then(function (hasToken) {
            if (hasToken === true) {
                _this.startLoading();
                _this.data.enterFolder(-1);
                _this.stopLoading();
            }
        });
    };
    return DrivePage;
}());
DrivePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-drive',template:/*ion-inline-start:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\drive\drive.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-searchbar [(ngModel)]="searchText">\n\n    </ion-searchbar>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div class="row drive-title folders">\n\n    <div class="col-xs-12" >\n\n      <div class="panel panel-default" style="border-radius: 0">\n\n        <div class="panel-heading">\n\n          <ion-icon style="cursor:pointer; padding-right: 10px;"\n\n                    *ngIf="data.folderLevels.length > 0" icon-left name="arrow-dropleft-circle"\n\n                    (tap)="exitFolder()"></ion-icon> Folders\n\n          <ion-icon *ngIf="data.state === 5" style="cursor:pointer; margin-left: 10px;" icon-right name="add"\n\n                    (tap)="createFolder()"></ion-icon>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="row">\n\n    <div *ngFor="let folder of currentFolder.folders | filter:searchText:data.state"\n\n         class="folder col-lg-2 col-md-4 col-sm-6 col-xs-12">\n\n      <div class="panel panel-default">\n\n        <div class="panel-heading text-center folder-header">\n\n          <ion-checkbox class="item-checkbox"\n\n                        [checked]="selected.has(folder)"\n\n                        (click)="updateSelectedItems(folder)">\n\n          </ion-checkbox>\n\n          <ion-icon name="briefcase" class="fa-5x"></ion-icon>\n\n        </div>\n\n        <div class="panel-body text-muted folder-title truncate" (tap)="enterFolder(folder.id, folder.folder_id)">\n\n          {{folder.name}}\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="row drive-title files">\n\n    <div class="col-xs-12">\n\n      <div class="panel panel-default" style="border-radius: 0">\n\n        <div class="panel-heading">Files</div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="row">\n\n    <div *ngFor="let file of currentFolder.files | filter:searchText:data.state"\n\n         class="file col-lg-2 col-md-4 col-sm-6 col-xs-12">\n\n      <div class="panel panel-default">\n\n        <div class="panel-heading text-center file-header">\n\n          <ion-checkbox class="item-checkbox"\n\n                        [checked]="selected.has(file)"\n\n                        (click)="updateSelectedItems(file)">\n\n          </ion-checkbox>\n\n          <ion-icon name="document" class="fa-5x"></ion-icon>\n\n        </div>\n\n        <div class="panel-body text-muted file-title truncate">\n\n          {{file.name}}\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <!--<h5 hideWhen="android,ios" class="text-center text-muted">Drag Files here to upload.</h5>-->\n\n\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <span class="hide-on-small" hideWhen="android,ios">\n\n      <button disabled *ngIf="(selected.size > 0) && (data.state === 5)"\n\n              ion-button icon-left clear\n\n              (tap)="shareItems()">\n\n        <ion-icon name="share" aria-label="share"></ion-icon>\n\n        Share\n\n      </button>\n\n\n\n      <button *ngIf="(selected.size === 1) && (data.state === 5)"\n\n              ion-button icon-left clear\n\n              (tap)="downloadItem()">\n\n        <ion-icon name="cloud-download" aria-label="download"></ion-icon>\n\n        Download\n\n      </button>\n\n\n\n      <button *ngIf="(selected.size > 0) && (data.state === 5)"\n\n              ion-button icon-left clear\n\n              (tap)="deleteItems()">\n\n        <ion-icon name="trash" aria-label="delete"></ion-icon>\n\n        Delete\n\n      </button>\n\n\n\n      <button *ngIf="(selected.size === 1) && (data.state === 5)"\n\n              ion-button icon-left clear\n\n              (tap)="renameItem()">\n\n        <ion-icon name="create" aria-label="rename"></ion-icon>\n\n        Rename\n\n      </button>\n\n\n\n      <button *ngIf="(selected.size > 0) && (data.state === 15)"\n\n                    ion-button icon-left clear\n\n                    (tap)="restoreItems()">\n\n        <ion-icon name="refresh" aria-label="restore"></ion-icon>\n\n        Restore\n\n      </button>\n\n    </span>\n\n\n\n    <button class="hide-on-large"\n\n            ion-button icon-only clear (tap)="presentPopover($event)">\n\n      <ion-icon name="more"></ion-icon>\n\n    </button>\n\n\n\n    <button *ngIf="selected.size > 0" class="pull-right"\n\n            ion-button icon-right clear end\n\n            (tap)="data.clearSelected()">\n\n      <ion-icon name="close" aria-label="unselect"></ion-icon>\n\n      {{selected.size}} Selected\n\n    </button>\n\n\n\n  </ion-toolbar>\n\n</ion-footer>\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\drive\drive.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_2__providers_data_service_data_service__["a" /* DataServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
], DrivePage);

//# sourceMappingURL=drive.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterPipe = (function () {
    function FilterPipe() {
    }
    /**
     * Filters an array of values by a string.
     */
    FilterPipe.prototype.transform = function (items, filter, state) {
        if (!items)
            return items;
        var lowercaseFilter = filter.toLowerCase();
        return items.filter(function (item) {
            var lowercaseItem = item.name ? item.name.toLowerCase() : "";
            return (lowercaseItem.includes(lowercaseFilter));
        });
    };
    return FilterPipe;
}());
FilterPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["X" /* Pipe */])({
        name: 'filter',
    })
], FilterPipe);

//# sourceMappingURL=filter.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map