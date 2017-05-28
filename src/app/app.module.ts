import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {ApiService} from "./api/api.service";
import {GameModule} from "./game/game.module";
import {GamesModule} from "./games/games.module";
import {LoginCallbackComponent} from "./login/callback.component";
import {LoginComponent} from "./login/login.component";
import {MenuComponent} from "./menu/menu.component";
import {MenuModule} from "./menu/menu.module";
import {LoginModule} from "./login/login.module";

const appRoutes:Routes = <Routes>[
  {
    path: 'login',
    children: LoginModule.loginRoutes
  },
  {
    // no endpoint == login endpoint
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'games',
    children: GamesModule.gameRoutes
  }


];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    GamesModule,
    GameModule,
    MenuModule,
    LoginModule
  ],
  providers: [ApiService], // its here because its a beautiful singleton.
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
