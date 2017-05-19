import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ConnectionServiceProvider} from "../connection-service/connection-service";
import {Observable} from 'rxjs/Observable';

export class User {
  private _name: string;
  private _email: string;
  public usage: number = 2;

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

  get usagePercent() {
    return (this.usage / 10) * 100;
  }
}

interface Credentials {
  email: string,
  password: string
}

@Injectable()
export class AuthServiceProvider {

  private authUser: User = null;

  constructor(private connection: ConnectionServiceProvider) {
    this.authUser = new User("michael", "michael-henderson@live.com.au");
  }

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
