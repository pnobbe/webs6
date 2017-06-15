import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {LoginCallbackComponent} from "./callback.component";
import {LoginComponent} from "./login.component";
import {ApiService} from "../api/api.service";


@NgModule({

  imports: [
    CommonModule,
    BrowserModule,
  ],
  declarations: [
    LoginCallbackComponent,
    LoginComponent
  ],
  providers: [ApiService],
  exports: []
})
export class LoginModule {

  public static get redirectPath():string {
    return "games"
  }
}

export const loginRoutes = <Routes>[
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "callback",
    component: LoginCallbackComponent
  }
];

