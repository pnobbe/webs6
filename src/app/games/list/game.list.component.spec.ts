import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {GameListComponent} from "./game.list.component";
import {MaterialDesignModule} from "../../materialdesign.module";
import {GameModule} from "../../game/game.module";
import {MenuModule} from "../../menu/menu.module";
import {ApiService} from "../../api/api.service";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {GameListFilterPipe} from "./game.list.filter.pipe";
import {LoggerComponent} from "../logger/logger.component";
import {Game} from "../../models/game";
import {User} from "../../models/user";
import {GameTemplate} from "../../models/game-template";


class MockService {

  static joined = "";
  static started = "";
  static deleted = "";
  public static games = <Game[]>[{
    _id: "1",
    gameTemplate: new GameTemplate(""),
    createdOn: "2017-06-20T07:25:57.153Z",
    startedOn: null,
    endedOn: null,
    createdBy: new User({_id: "aa", name: "bb"}),
    minPlayers: 2,
    maxPlayers: 2,
    players: [],
    state: "open",
    tiles: [],
    matches: []
  },
    {
      _id: "2",
      gameTemplate: new GameTemplate(""),
      createdOn: "2017-06-20T07:25:57.153Z",
      startedOn: null,
      endedOn: null,
      createdBy: new User({_id: "aa", name: "bb"}),
      minPlayers: 2,
      maxPlayers: 2,
      players: [],
      state: "playing",
      tiles: [],
      matches: []
    },
    {
      _id: "3",
      gameTemplate: new GameTemplate(""),
      createdOn: "2017-06-20T07:25:57.153Z",
      startedOn: null,
      endedOn: null,
      createdBy: new User({_id: "aa", name: "bb"}),
      minPlayers: 2,
      maxPlayers: 2,
      players: [],
      state: "playing",
      tiles: [],
      matches: []
    }, {
      _id: "4",
      gameTemplate: new GameTemplate(""),
      createdOn: "2017-06-20T07:25:57.153Z",
      startedOn: null,
      endedOn: null,
      createdBy: new User({_id: "none", name: "bb"}),
      minPlayers: 2,
      maxPlayers: 2,
      players: [],
      state: "finished",
      tiles: [],
      matches: []
    },
    {
      _id: "5",
      gameTemplate: new GameTemplate(""),
      createdOn: "2017-06-20T07:25:57.153Z",
      startedOn: null,
      endedOn: null,
      createdBy: new User({_id: "none", name: "bb"}),
      minPlayers: 2,
      maxPlayers: 2,
      players: [],
      state: "finished",
      tiles: [],
      matches: []
    },
    {
      _id: "6",
      gameTemplate: new GameTemplate(""),
      createdOn: "2017-06-20T07:25:57.153Z",
      startedOn: null,
      endedOn: null,
      createdBy: new User({_id: "aa", name: "bb"}),
      minPlayers: 2,
      maxPlayers: 2,
      players: [],
      state: "finished",
      tiles: [],
      matches: []
    }];

  public games = {
    getGames() {
      return Promise.resolve(this.data);
    },
    startGame(id: string) {
      MockService.started = id;
      return Promise.resolve(true);
    },
    joinGame(id: string) {
      MockService.joined = id;
      return Promise.resolve(true);
    },
    deleteGame(id: string) {
      MockService.deleted = id;
      return Promise.resolve(true);
    }
  };

  public users = {
    getMe() {
      return new User({_id: "aa"});
    }

  };

}

describe("GameListComponent", () => {
  let
    component: GameListComponent;
  let
    fixture: ComponentFixture<GameListComponent>;

  beforeEach(async

  (() => {
      TestBed
        .configureTestingModule({
          imports: [CommonModule,
            FormsModule,
            MenuModule,
            BrowserModule,
            RouterTestingModule,
            GameModule,
            MaterialDesignModule, HttpModule],
          declarations: [
            GameListComponent, GameListFilterPipe, LoggerComponent],
          providers: [{
            provide: ApiService,
            useClass: MockService
          }, {
            provide: XHRBackend,
            useClass: MockBackend
          }]
        })

        .compileComponents();
    }
  ))
  ;
  const pipe = new GameListFilterPipe();

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show playing", () => {
    expect(pipe.transform(MockService.games, "playing", "aa").length).toEqual(2);
  });
  it("should show finished", () => {
    expect(pipe.transform(MockService.games, "finished", "aa").length).toEqual(1);
  });

  it("should show favorites", () => {

    expect(pipe.transform(MockService.games, "favorites", "aa").length).toEqual(0);
  });

  it("should show mine", () => {
    expect(pipe.transform(MockService.games, "mine", "aa").length).toEqual(3);
  });

  it("should show all", () => {
    expect(pipe.transform(MockService.games, "", "aa").length).toEqual(6);
  });

  it("should show open", () => {
    expect(pipe.transform(MockService.games, "open", "aa").length).toEqual(1);
  });


  it("should delete", () => {
    component.delete(MockService.games[1]);
    expect(MockService.deleted).toEqual(MockService.games[1]._id);
  });


  it("should start", () => {
    component.start(MockService.games[2]);
    expect(MockService.started).toEqual(MockService.games[2]._id);
  });


  it("should join", () => {
    component.join(MockService.games[3]);
    expect(MockService.joined).toEqual(MockService.games[3]._id);
  });
})
;
