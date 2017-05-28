import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {LoginCallbackComponent} from "./callback.component";
import {LoginComponent} from "./login.component";


@NgModule({

  imports: [
    CommonModule,
    BrowserModule,
  ],
  declarations: [
    LoginCallbackComponent,
    LoginComponent
  ],
  providers: [],
  exports: []
})
export class LoginModule {

  static get loginRoutes() {

    return <Routes>[
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'callback',
        component: LoginCallbackComponent
      }
    ];

  }
}

