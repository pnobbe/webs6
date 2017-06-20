import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameTileComponent } from "./game.tile.component";
import {MaterialDesignModule} from "../../materialdesign.module";
import {MenuModule} from "../../menu/menu.module";
import {CommonModule} from "@angular/common";
import {ApiService} from "../../api/api.service";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {FilterSelectablePipe} from "../board/game.board.selectable.pipe";
import {FilterHiddenTilePipe} from "../board/game.board.filter.pipe";

describe("GameTileComponent", () => {
  let component: GameTileComponent;
  let fixture: ComponentFixture<GameTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule,
          MaterialDesignModule, HttpModule],
        declarations: [GameTileComponent, FilterHiddenTilePipe, FilterSelectablePipe],
        providers: [ApiService, {
          provide: XHRBackend,
          useClass: MockBackend
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
