import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {ConnectionServiceProvider} from "../connection-service/connection-service";
import {Observable} from 'rxjs/Observable';

export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  public _usage: number;

  constructor(id: number, name: string, email: string, usage: number) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._usage = usage;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get allocated() {
    return 500; //MB
  }

  get usage() {
    let usage = (this._usage / 1000000);
    return Number((usage).toFixed(4));
  }

  set usage(usage) {
    this._usage = usage;
  }

  get usagePercent() {
    let percent = (this.usage / this.allocated) * 100;
    return Number((percent).toFixed(3));
  }
}

export interface Credentials {
  email: string,
  password: string,
  remember: boolean
}

export interface Registration {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

@Injectable()
export class AuthServiceProvider {

  public authUser: User = null;

  constructor(private connection: ConnectionServiceProvider) {}

  public login(credentials: Credentials): Observable<{success: boolean, errors?}> {
    return Observable.create(observer => {
      this.connection.send("login", JSON.stringify(credentials)).subscribe(
        result => this.handleLoginRegisterResponse(result, observer),
        error => {observer.next({success: false}); observer.complete()}
      );
    });
  }

  private handleLoginRegisterResponse(result, observer) {
    if (result.status === "success") {
      const token = result.api_token;
      this.connection.setAuthToken(token).subscribe(() => {
        observer.next({success: true});
        observer.complete();
      });
    } else {
      observer.next({success: false, errors: result.errors});
      observer.complete();
    }
  }

  public logout() {
    this.connection.clearAuthToken();
  }

  public register(registration: Registration): Observable<{success: boolean, errors?}> {
    return Observable.create(observer => {
      this.connection.send("register", JSON.stringify(registration)).subscribe(
        result => this.handleLoginRegisterResponse(result, observer),
        error => {observer.next({success: false}); observer.complete()}
      );
    });
  }

  public loadAuthenticatedUser(): Observable<User> {
    return Observable.create(observer => {
      this.connection.notify("user").subscribe(
          result => {
            const user = result.user;
            this.authUser = new User(user.id, user.name, user.email, user.used);
            observer.next(this.authUser);
            observer.complete();
          },
          error => observer.complete()
      );
    });
  }

  async isAuthenticated(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.connection.hasAuthTokenSet().subscribe(
          result => resolve(result),
          error => reject(error)
      );
    });

  }

}
