import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Headers, Http, Response, RequestOptionsArgs} from '@angular/http';
import {Game} from '../models/game';
import {GameTemplate} from '../models/game-template';
import {User} from '../models/user';
import {GameState} from '../models/game-state';
import {Observable} from 'rxjs/Observable';
import {Tile} from '../models/tile';
import {Connection} from './connection';
import {GameApi} from "./game";
import {UserApi} from "./user";
import {TemplateApi} from "./templates";


@Injectable()
export class ApiService {

  public static user_email = "";
  
  public  templates:TemplateApi;
  public  games:GameApi;
  public  users:UserApi;

  constructor(@Inject(DOCUMENT) private document:any, http:Http) {
    this.templates = new TemplateApi(http);
    this.games = new GameApi(http);
    this.users = new UserApi(http, document);

    // set from storage
    ApiService.user_email = this.users.email;
  }


}
