import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {GameBoardComponent} from "./game.board.component";
import { GameTileComponent } from "../tile/game.tile.component";
import {MaterialDesignModule} from "../../materialdesign.module";
import {MenuModule} from "../../menu/menu.module";
import {CommonModule} from "@angular/common";
import {ApiService} from "../../api/api.service";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {FilterSelectablePipe} from "../board/game.board.selectable.pipe";
import {FilterHiddenTilePipe} from "../board/game.board.filter.pipe";
import {GameTileOrderBy} from "./game.board.orderby.pipe";

describe("GameBoardComponent", () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule,
          MaterialDesignModule, HttpModule],
        declarations: [GameBoardComponent, GameTileComponent, FilterHiddenTilePipe, FilterSelectablePipe, GameTileOrderBy],
        providers: [ApiService, {
          provide: XHRBackend,
          useClass: MockBackend
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
