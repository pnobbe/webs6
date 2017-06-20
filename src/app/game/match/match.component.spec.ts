import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MatchComponent} from "./match.component";
import {MaterialDesignModule} from "../../materialdesign.module";
import {GameTileComponent} from "../tile/game.tile.component";
import {CommonModule} from "@angular/common";
import {FilterSelectablePipe} from "../board/game.board.selectable.pipe";
import {FilterHiddenTilePipe} from "../board/game.board.filter.pipe";
import {ApiService} from "../../api/api.service";
import {MockBackend} from "@angular/http/testing";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";

describe("MatchComponent", () => {
  let component: MatchComponent;
  let fixture: ComponentFixture<MatchComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [CommonModule,
            MaterialDesignModule, HttpModule],
          declarations: [MatchComponent, GameTileComponent, FilterHiddenTilePipe, FilterSelectablePipe],
          providers: [ApiService, {
            provide: XHRBackend,
            useClass: MockBackend
          }]
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
})
;
