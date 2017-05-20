import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ConnectionServiceProvider} from "../connection-service/connection-service";
import {Observable} from 'rxjs/Observable';

export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  public usage: number = 2;

  constructor(id: number, name: string, email: string, usage: number) {
    this._id = id;
    this._name = name;
    this._email = email;
    this.usage = usage;
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
    return 10; //GB
  }

  get usagePercent() {
    return (this.usage / this.allocated) * 100;
  }
}

export interface Credentials {
  email: string,
  password: string,
  remember: boolean
}

@Injectable()
export class AuthServiceProvider {

  private authUser: User = null;

  constructor(private connection: ConnectionServiceProvider) {}

  public login(credentials: Credentials): Observable<{success: boolean, errors?}> {
    return Observable.create(observer => {
      this.connection.send("login", JSON.stringify(credentials)).subscribe(
        result => this.handleLoginResponse(result, observer),
        error => {observer.next({success: false}); observer.complete()}
      );
    });
  }

  private handleLoginResponse(result, observer) {
    console.log(result);
    if (result.status === "success") {
      const user = result.user;
      this.authUser = new User(user.id, user.name, user.email, user.usage);
      const token = result.api_token;
      this.connection.setAuthToken(token);
      observer.next({success: true});
    } else {
      observer.next({success: true, errors: result.errors})
    }
    observer.complete()

  }

  public logout() {
    this.connection.clearAuthToken();
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
