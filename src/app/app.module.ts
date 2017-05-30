import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {ApiService} from "./api/api.service";
import {GameModule} from "./game/game.module";
import {GamesModule} from "./games/games.module";
import {MenuModule} from "./menu/menu.module";
import {LoginModule} from "./login/login.module";
import {gameRoutes} from "./games/games.module";
import {loginRoutes} from "./login/login.module";

const appRoutes:Routes = <Routes>[
  {
    path: 'login',
    children: loginRoutes
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'games',
    children: gameRoutes
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
