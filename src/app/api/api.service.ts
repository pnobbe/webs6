import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
import {Http} from "@angular/http";
import {GameApi} from "./implementation/game";
import {UserApi} from "./implementation/user";
import {TemplateApi} from "./implementation/templates";
import {SpriteApi} from "./implementation/sprite";

@Injectable()
export class ApiService {

  public static user_email = "";

  public templates: TemplateApi;
  public games: GameApi;
  public users: UserApi;
  public sprites: SpriteApi;

  constructor(@Inject(DOCUMENT) private document: any, http: Http) {
    this.templates = new TemplateApi(http);
    this.games = new GameApi(http);
    this.users = new UserApi(http, document);
    this.sprites = new SpriteApi(http);

    // set from storage
    ApiService.user_email = this.users.email;
  }


}
