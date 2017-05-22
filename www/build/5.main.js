webpackJsonp([5],{

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(293);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]
        ]
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(201);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginPage = (function () {
    function LoginPage(navCtrl, auth, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.credentials = { email: "", password: "", remember: false };
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.toggleLoading();
        var subscription = this.auth.login(this.credentials).subscribe(function (result) {
            if (result.success === true) {
                _this.loading.dismiss().then(function () {
                    subscription.unsubscribe();
                    _this.navCtrl.setRoot("MainPage");
                });
            }
            else {
                _this.showError();
            }
        });
    };
    LoginPage.prototype.toggleLoading = function () {
        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            content: "Loading..."
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function () {
        var alert = this.alertCtrl.create({
            title: 'Failed',
            subTitle: 'Please check your credentials',
            buttons: ['ok']
        });
        this.loading.dismiss().then(function () {
            alert.present();
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.navBar.backButtonClick = function (e) {
            _this.navCtrl.setRoot("WelcomePage");
        };
        var subscription = this.auth.isAuthenticated().subscribe(function (hasToken) {
            subscription.unsubscribe();
            if (hasToken === true) {
                _this.navCtrl.setRoot("MainPage");
            }
        });
    };
    return LoginPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Navbar */])
], LoginPage.prototype, "navBar", void 0);
LoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\login\login.html"*/'\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Web Drive</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid fixed>\n\n    <ion-row>\n\n      <ion-col col-md-8 offset-md-2>\n\n        <div class="panel panel-default">\n\n          <div class="panel-heading">Login</div>\n\n          <div class="panel-body">\n\n            <form class="form-horizontal" (ngSubmit)="login()" #loginForm="ngForm">\n\n\n\n              <div class="form-group">\n\n                <label for="email" class="col-md-4 control-label">E-Mail Address</label>\n\n\n\n                <div class="col-md-6">\n\n                  <input id="email" [(ngModel)]="credentials.email" type="email"\n\n                         class="form-control" name="email" required autofocus>\n\n                </div>\n\n              </div>\n\n\n\n              <div class="form-group">\n\n                <label for="password" class="col-md-4 control-label">Password</label>\n\n\n\n                <div class="col-md-6">\n\n                  <input id="password" [(ngModel)]="credentials.password"\n\n                         type="password" class="form-control" name="password" required>\n\n                </div>\n\n              </div>\n\n\n\n              <!--<div class="form-group">-->\n\n                <!--<div class="col-md-8 col-md-offset-4">-->\n\n                  <!--<ion-item class="remember-item">-->\n\n                    <!--<ion-label fixed>Remember me</ion-label>-->\n\n                    <!--<ion-checkbox></ion-checkbox>-->\n\n                  <!--</ion-item>-->\n\n                <!--</div>-->\n\n              <!--</div>-->\n\n\n\n              <div class="form-group">\n\n                <div class="col-md-8 col-md-offset-4">\n\n                  <button ion-button class="submit-btn" type="submit"\n\n                    [disabled]="!loginForm.form.valid">Login</button>\n\n\n\n                  <!--<a (click)="goToRegister()" class="btn btn-link" href="javascript:void(0)">-->\n\n                    <!--Register?-->\n\n                  <!--</a>-->\n\n                </div>\n\n              </div>\n\n            </form>\n\n          </div>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* AlertController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=5.main.js.map