import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PlayerComponent} from "./player.component";
import {MaterialDesignModule} from "../../materialdesign.module";
import {CommonModule} from "@angular/common";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MatchComponent} from "../match/match.component";
import {GameTileComponent} from "../tile/game.tile.component";

describe("PlayerComponent", () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CommonModule,
          MaterialDesignModule, HttpModule],
        declarations: [PlayerComponent, MatchComponent, GameTileComponent],
        providers: []
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
