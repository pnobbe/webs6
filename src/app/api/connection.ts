import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Headers, Http, Response, RequestOptionsArgs} from '@angular/http';
import {Game} from '../models/game';
import {GameTemplate} from '../models/game-template';
import {User} from '../models/user';
import {GameState} from '../models/game-state';
import {Observable} from 'rxjs/Observable';
import {Tile} from '../models/tile';


export class Connection {
  private _host = 'http://mahjongmayhem.herokuapp.com';

  constructor(private http:Http) {
  }


  set email(email:string) {
    localStorage.setItem('user-email', email);
  }

  set token(token:string) {
    localStorage.setItem('user-token', token);
  }

  get email() {
    return localStorage.getItem('user-email');
  }

  get token() {
    return localStorage.getItem('user-token');
  }

  get isLoggedIn():boolean {
    return !!(this.email && this.token);
  }

  public logout():void {
    localStorage.clear();
  }


  public url(route:string):string {
    return `${this._host}/${route}`;
  }

  private headers():Headers {
    const headers = new Headers();
    headers.set('x-token', this.token);
    headers.set('x-username', this.email);

    return headers;
  }

  public get(route:string, query:any[] = []):Observable<Response> {
    return this.http.get(this.url(route));
  }

  public post(route:string, body:any = {}):Observable<Response> {
    return this.http.post(this.url(route), body, <RequestOptionsArgs>{
      headers: this.headers()
    });
  }

  public put(route:string, body:any = {}):Observable<Response> {
    return this.http.put(this.url(route), body, <RequestOptionsArgs>{
      headers: this.headers()
    });
  }

  public delete(route:string):Observable<Response> {
    return this.http.delete(this.url(route), <RequestOptionsArgs>{
      headers: this.headers()
    });
  }

}
