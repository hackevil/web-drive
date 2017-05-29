webpackJsonp([3],{

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popover_options__ = __webpack_require__(293);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverOptionsPageModule", function() { return PopoverOptionsPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PopoverOptionsPageModule = (function () {
    function PopoverOptionsPageModule() {
    }
    return PopoverOptionsPageModule;
}());
PopoverOptionsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__popover_options__["a" /* PopoverOptionsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__popover_options__["a" /* PopoverOptionsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__popover_options__["a" /* PopoverOptionsPage */]
        ]
    })
], PopoverOptionsPageModule);

//# sourceMappingURL=popover-options.module.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(99);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverOptionsPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopoverOptionsPage = (function () {
    function PopoverOptionsPage(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.parent = this.params.get("parent");
    }
    PopoverOptionsPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return PopoverOptionsPage;
}());
PopoverOptionsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-popover-options',template:/*ion-inline-start:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\popover-options\popover-options.html"*/'\n\n<ion-content>\n\n\n\n  <ion-list>\n\n    <ion-list-header>Actions</ion-list-header>\n\n    <button ion-item *ngIf="(parent.data.state === 5)"\n\n            (tap)="parent.createFolder(); close()">\n\n      <ion-icon name="add" aria-label="add"></ion-icon>\n\n      Create Folder\n\n    </button>\n\n    <button ion-item *ngIf="(parent.selected.size === 1) && (parent.data.state === 5)"\n\n            (tap)="parent.downloadItem(); close()">\n\n      <ion-icon name="cloud-download" aria-label="download"></ion-icon>\n\n      Download\n\n    </button>\n\n    <button ion-item *ngIf="(parent.selected.size > 0) && (parent.data.state === 5)"\n\n            (tap)="parent.deleteItems(); close()">\n\n      <ion-icon name="trash" aria-label="delete"></ion-icon>\n\n      Delete\n\n    </button>\n\n    <button ion-item *ngIf="(parent.selected.size === 1) && (parent.data.state === 5)"\n\n            (tap)="parent.renameItem(); close()">\n\n      <ion-icon name="create" aria-label="rename"></ion-icon>\n\n      Rename\n\n    </button>\n\n    <button ion-item *ngIf="(parent.selected.size > 0) && (parent.data.state === 15)"\n\n            (tap)="parent.restoreItems(); close()">\n\n      <ion-icon name="refresh" aria-label="restore"></ion-icon>\n\n      Restore\n\n    </button>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\popover-options\popover-options.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], PopoverOptionsPage);

//# sourceMappingURL=popover-options.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map