import { Injectable } from '@angular/core';
import {Http, RequestOptionsArgs, ResponseContentType, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";


@Injectable()
export class ConnectionServiceProvider {

  private hasAuthToken: boolean = false;
  private server: string = "https://webdrive.dev/";
  private headers: Headers = new Headers();


  private replaySubject = new ReplaySubject<boolean>(1);
  private tokenExists: Observable<boolean> = this.replaySubject.asObservable();

  constructor(private http: Http, private storage: Storage) {
    this.storage.get("api_token").then(token => {
      this.hasAuthToken = !!token;
      this.headers.set("Authorization", "Bearer " + token);
      this.replaySubject.next(this.hasAuthToken);
    });

    this.headers.append('Content-Type', 'application/json');
  }

  public setAuthToken(token: string): Observable<boolean> {
    return Observable.create(observer => {
      this.storage.set("api_token", token).then( () => {
        this.replaySubject.next(true);
        this.headers.set("Authorization", "Bearer " + token);
        this.hasAuthToken = true;
        observer.next(true);
        observer.complete();
      });
    });
  }

  public clearAuthToken() {
    this.storage.remove("api_token").then( () => {
      this.replaySubject.next(false);
      this.headers.delete("Authorization");
      this.hasAuthToken = false;
    });
  }

  public hasAuthTokenSet(): Observable<boolean> {
    return this.tokenExists;
  }

  public notify(endpoint: string, params?) : Observable<string> {
        return this.http.get(this._getUrl(endpoint),
          this._getRequestArguments(params)).map(response => response.json());
  }

  public send(endpoint: string, data?: any): Observable<string> {
        return this.http.post(this._getUrl(endpoint), data,
          this._getRequestArguments()).map(response => response.json());
  }

  private _getUrl(endpoint: string): string {
    return (this.server + endpoint);
  }

  private _getRequestArguments(params?): RequestOptionsArgs {
    let args = {
      headers: this.headers,
      responseType: ResponseContentType.Json
    };
    if (params) args["params"] = params;
    return args;
  }

}
