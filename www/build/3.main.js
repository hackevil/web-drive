webpackJsonp([3],{

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(296);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = (function () {
    function RegisterPageModule() {
    }
    return RegisterPageModule;
}());
RegisterPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]
        ]
    })
], RegisterPageModule);

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(201);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterPage = (function () {
    function RegisterPage(navCtrl, auth, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.registration = { name: "", email: "", password: "", password_confirmation: "" };
        this.errors = new Map();
    }
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.toggleLoading();
        this.errors.clear();
        var subscription = this.auth.register(this.registration).subscribe(function (result) {
            if (result.success === true) {
                _this.loading.dismiss().then(function () {
                    subscription.unsubscribe();
                    _this.navCtrl.setRoot("MainPage");
                });
            }
            else {
                if (result.errors) {
                    _this.loading.dismiss();
                    _this.setErrors(result.errors);
                }
                else {
                    _this.showError();
                }
            }
        });
    };
    RegisterPage.prototype.setErrors = function (errors) {
        if (errors.name)
            this.errors.set("name", errors.name);
        if (errors.email)
            this.errors.set("email", errors.email);
        if (errors.password) {
            this.errors.set("password", errors.password[0]);
            if (errors.password.length === 2)
                this.errors.set("confirmation", errors.password[1]);
        }
    };
    RegisterPage.prototype.toggleLoading = function () {
        this.loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            content: "Loading..."
        });
        this.loading.present();
    };
    RegisterPage.prototype.showError = function () {
        var alert = this.alertCtrl.create({
            title: 'Failed',
            subTitle: 'An error occurred while registering.',
            buttons: ['ok']
        });
        this.loading.dismiss().then(function () {
            alert.present();
        });
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.navBar.backButtonClick = function (e) {
            _this.navCtrl.setRoot("WelcomePage");
        };
        this.auth.isAuthenticated().then(function (hasToken) {
            if (hasToken === true) {
                _this.navCtrl.setRoot("MainPage");
            }
        });
    };
    return RegisterPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Navbar */])
], RegisterPage.prototype, "navBar", void 0);
RegisterPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\register\register.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Web Drive</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-grid fixed>\n\n    <ion-row>\n\n      <ion-col col-md-8 offset-md-2>\n\n        <div class="panel panel-default">\n\n          <div class="panel-heading">Register</div>\n\n          <div class="panel-body">\n\n            <form class="form-horizontal" (ngSubmit)="register()" #registerForm="ngForm">\n\n\n\n              <div class="form-group {{ errors.has(\'name\') ? \' has-error\' : \'\' }}">\n\n                <label for="name" class="col-md-4 control-label">Name</label>\n\n\n\n                <div class="col-md-6">\n\n                  <input id="name" [(ngModel)]="registration.name" type="text"\n\n                         class="form-control" name="name" required autofocus>\n\n                  <span *ngIf="errors.has(\'name\')" class="help-block">\n\n                    <strong>{{ errors.get(\'name\') }}</strong>\n\n                  </span>\n\n                </div>\n\n              </div>\n\n\n\n              <div class="form-group {{ errors.has(\'email\') ? \' has-error\' : \'\' }}">\n\n                <label for="email" class="col-md-4 control-label">E-Mail Address</label>\n\n\n\n                <div class="col-md-6">\n\n                  <input id="email" [(ngModel)]="registration.email" type="email"\n\n                         class="form-control" name="email" required>\n\n                  <span *ngIf="errors.has(\'email\')" class="help-block">\n\n                    <strong>{{ errors.get(\'email\') }}</strong>\n\n                  </span>\n\n                </div>\n\n              </div>\n\n\n\n              <div class="form-group {{ errors.has(\'password\') ? \' has-error\' : \'\' }}">\n\n                <label for="password" class="col-md-4 control-label">Password</label>\n\n\n\n                <div class="col-md-6">\n\n                  <input id="password" [(ngModel)]="registration.password"\n\n                         type="password" class="form-control" name="password" required>\n\n                  <span *ngIf="errors.has(\'password\')" class="help-block">\n\n                    <strong>{{ errors.get(\'password\') }}</strong>\n\n                  </span>\n\n                </div>\n\n              </div>\n\n\n\n              <div class="form-group {{ errors.has(\'confirmation\') ? \' has-error\' : \'\' }}">\n\n                <label for="confirm-password" class="col-md-4 control-label">Confirm Password</label>\n\n\n\n                <div class="col-md-6">\n\n                  <input id="confirm-password" [(ngModel)]="registration.password_confirmation"\n\n                         type="password" class="form-control" name="confirm-password" required>\n\n                  <span *ngIf="errors.has(\'confirmation\')" class="help-block">\n\n                    <strong>{{ errors.get(\'confirmation\') }}</strong>\n\n                  </span>\n\n                </div>\n\n              </div>\n\n\n\n              <div class="form-group">\n\n                <div class="col-md-8 col-md-offset-4">\n\n                  <button ion-button class="submit-btn" type="submit"\n\n                          [disabled]="!registerForm.form.valid">Register</button>\n\n                </div>\n\n              </div>\n\n            </form>\n\n          </div>\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Media-PC\Documents\code-uni\infs3202\frontend\src\pages\register\register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* AlertController */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map