import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ConnectionServiceProvider} from "../connection-service/connection-service";
import {Observable} from 'rxjs/Observable';

class User {
  private _name: string;
  private _email: string;

  constructor(name: string, email: string) {
    this._name = name;
    this._email = email;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }
}

interface Credentials {
  email: string,
  password: string
}

@Injectable()
export class AuthServiceProvider {

  private authUser: User = null;

  constructor(private connection: ConnectionServiceProvider) {}

  public login(credentials: Credentials): Observable<boolean> {
    return Observable.create(observer => {
      this.connection.send(JSON.stringify(credentials), "login").subscribe(
        result => this.handleLoginResponse(result, observer),
        error => {observer.next(false); observer.complete()}
      );
    });
  }

  private handleLoginResponse(result, observer) {
    console.log(result);
    this.authUser = new User("Michael", "michael-henderson@live.com.au");
    const token = "498e459bjfbgj4jb4b5kjb345";
    this.connection.setAuthToken(token);
    observer.next(true);
    observer.complete()
  }

  public logout(): Observable<boolean> {
    return Observable.create(observer => {
      this.connection.notify("logout").subscribe(
        result => this.handleLogoutResponse(result, observer),
        error => {observer.next(false); observer.complete()}
      );
    });
  }

  private handleLogoutResponse(result, observer) {
    console.log(result);
    this.connection.clearAuthToken();
    observer.next(true);
    observer.complete();
  }

  public register(details) {

  }

  public getAuthenticatedUser() {
    return this.authUser;
  }

  public isAuthenticated() {
    return this.connection.hasAuthTokenSet();
  }

}
