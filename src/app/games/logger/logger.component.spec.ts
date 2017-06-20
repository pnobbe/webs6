import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {LoggerComponent} from "./logger.component";
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
import {GameListFilterPipe} from "../list/game.list.filter.pipe";
import {GameListComponent} from "../list/game.list.component";


describe("LoggerComponent", () => {
  let component: LoggerComponent;
  let fixture: ComponentFixture<LoggerComponent>;

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
          GameListComponent, GameListFilterPipe, LoggerComponent],
        providers: [ApiService, {
          provide: XHRBackend,
          useClass: MockBackend
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
