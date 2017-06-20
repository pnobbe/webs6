import {async, ComponentFixture, TestBed,  tick, fakeAsync} from "@angular/core/testing";
import {GameCreateComponent} from "./game.create.component";
import {ApiService} from "../../api/api.service";
import {GameModule} from "../../game/game.module";
import {MaterialDesignModule} from "../../materialdesign.module";
import {MenuModule} from "../../menu/menu.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {KeyPipe} from "./game.create.transform.pipe";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { Router} from "@angular/router";
import {GameTemplate} from "../../models/game-template";

class MockRouter {
  navigate(url: string[]) {
  }
}

class MockService {

  static savedGame = "";
  private data = <GameTemplate[]>[{
    id: "Dragon",
    tiles: [],
  },
    {
      id: "Bear",
      tiles: [],
    }];

  public templates = {
    getTemplates() {
      return Promise.resolve(this.data);
    }
  };


  public games = {
    createGame(teplateId, minPlayer, maxPlayer) {
      MockService.savedGame = teplateId;
      return Promise.resolve("done");

    }
  };
}


describe("GameCreateComponent", () => {
  let component: GameCreateComponent;
  let fixture: ComponentFixture<GameCreateComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule,
          FormsModule,
          MenuModule,
          BrowserModule,
          GameModule,
          MaterialDesignModule, HttpModule
        ],

        declarations: [GameCreateComponent,
          KeyPipe],
        providers: [{provide: ApiService, useClass: MockService}, {provide: Router, useClas: MockRouter}]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load templates", fakeAsync(() => {
    tick();
    expect(component.gameTemplates).toBeTruthy();
    console.log(component.gameTemplates);
    expect(component.gameTemplates["Dragon"]).not.toBeNull();
    expect(component.gameTemplates["Bear"]).not.toBeNull();

  }));

  it("should save game", fakeAsync(() => {

    component.model.gameTemplate.id = "Dragon";
    component.onSubmit();
    tick();
    expect(MockService.savedGame).toEqual("Dragon");
  }));

});
