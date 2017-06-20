import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {MenuComponent} from "./menu.component";
import {MaterialDesignModule} from "../materialdesign.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {ApiService} from "../api/api.service";

describe("MenuComponent", () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserModule,
          MaterialDesignModule,
          RouterTestingModule,
          MaterialDesignModule, HttpModule
        ],
        declarations: [
          MenuComponent
        ],
        providers: [ApiService, {
          provide: XHRBackend,
          useClass: MockBackend
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
