import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {LoginComponent} from "./login.component";
import {MaterialDesignModule} from "../materialdesign.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {ApiService} from "../api/api.service";
import {LoginCallbackComponent} from "./callback.component";


describe("LoginCallbackComponent", () => {
  let component: LoginCallbackComponent;
  let fixture: ComponentFixture<LoginCallbackComponent>;

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
          LoginCallbackComponent,
          LoginComponent
        ],
        providers: [ApiService, {
          provide: XHRBackend,
          useClass: MockBackend
        }]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
