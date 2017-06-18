import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";
import {ApiService} from "./api/api.service";
import {GameModule} from "./game/game.module";
import {gameRoutes, GamesModule} from "./games/games.module";
import {MenuModule} from "./menu/menu.module";
import {LoginModule, loginRoutes} from "./login/login.module";
import "hammerjs";
import {MaterialDesignModule} from "./materialdesign.module";

const appRoutes: Routes = <Routes>[
  {
    path: "login",
    children: loginRoutes
  },
  {
    path: "games",
    children: gameRoutes
  },
  {
    path: "**",
    redirectTo: "/login",
    pathMatch: "full"
  },


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
    LoginModule,
    MaterialDesignModule
  ],
  providers: [ApiService], // its here because its a beautiful singleton.
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
