import {async, ComponentFixture, TestBed, fakeAsync, tick} from "@angular/core/testing";
import {GamePlayComponent} from "../game.play.component";
import {MaterialDesignModule} from "../../../materialdesign.module";
import {GameModule} from "../../../game/game.module";
import {MenuModule} from "../../../menu/menu.module";
import {ApiService} from "../../../api/api.service";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {GameListFilterPipe} from "../../list/game.list.filter.pipe";
import {GameListComponent} from "../../list/game.list.component";
import {GamePlayHistoryComponent} from "../history/game.play.history.component";
import {GamePlayBoardComponent} from "../board/game.play.board.component";
import {gametiles} from "../tiles.spec";
import {User} from "../../../models/user";
import {Game} from "../../../models/game";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {GameTemplate} from "../../../models/game-template";
import {Tile} from "../../../models/tile";


class MockRouter {
  navigate(url: string[]) {
  }
}

class MockActivatedRoute {
  params = new Observable<any>((observer: any) => {
    observer.next({id: "5948ce053b7cc40011a52011"});
    observer.complete();
  });
}

ApiService.user_email = "aa@a";
class MockService {


  static game = new Game({
    "_id": "5948ce053b7cc40011a52011",
    "createdBy": {
      "_id": "aa@a",
      "name": "name",
      "__v": 0
    },
    "createdOn": "2017-06-20T07:25:57.153Z",
    "gameTemplate": {
      "_id": "Ox",
      "__v": 0,
      "id": "Ox",
      "tiles": []
    },
    "__v": 0,
    "startedOn": "2017-06-20T07:26:00.977Z",
    "players": [
      {
        "_id": "aa@a",
        "name": "name",
        "__v": 0,
        "numberOfMatches": 4
      }
    ],
    "maxPlayers": 1,
    "minPlayers": 1,
    "state": "playing",
    "id": "5948ce053b7cc40011a52011"
  });
  static user_email = "aa@a";

  self = this;
  public games = {
    getGame(id: string) {
      console.log("GETGAME");
      console.log(MockService.game);
      return Promise.resolve(MockService.game);
    },
    gameTiles(id: string, match: boolean) {
      return Promise.resolve(MockService.create());
    }
  };

  public users = {
    getMe() {
      return new User({_id: "aa@a", name: "name"});
    }

  };


  static create() {
    const tileArr = [];

    for (const t of gametiles) {
      tileArr.push(new Tile(t));
    }
    return tileArr;
  }


}

describe("GamePlayHistoryComponent", () => {
  let component: GamePlayHistoryComponent;
  let fixture: ComponentFixture<GamePlayHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule,
          FormsModule,
          MenuModule,
          BrowserModule,
          RouterTestingModule,
          GameModule,
          MaterialDesignModule, HttpModule],
        declarations: [
          GamePlayHistoryComponent, GamePlayBoardComponent, GamePlayComponent],
        providers: [{provide: ApiService, useClass: MockService}, {
          provide: Router,
          useClas: MockRouter
        }, {provide: ActivatedRoute, useClass: MockActivatedRoute}]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load tiles", () => {
    fixture.whenStable().then(() => {

      component.getGameData("5948ce053b7cc40011a52011").then(c => {
        expect(component.tiles.length).toEqual(144);
      });
    });
  });

  it("should load matchTiles", () => {
    fixture.whenStable().then(() => {

      component.getGameData("5948ce053b7cc40011a52011").then(c => {
        expect(component.seenMatches.length).toEqual(8);
      });
    });

  });

  it("should traverse history", () => {
    fixture.whenStable().then(() => {

      component.getGameData("5948ce053b7cc40011a52011").then(c => {
        expect(component.tiles.filter(v => !v.hidden).length).toEqual(136);
        component.previous();
        expect(component.tiles.filter(v => !v.hidden).length).toEqual(138);
        component.next();
        expect(component.tiles.filter(v => !v.hidden).length).toEqual(136);
      });
    });
  });
});
