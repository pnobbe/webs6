import {GameListFilterPipe} from "./list/game.list.filter.pipe";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GameListComponent} from "./list/game.list.component";
import {GameCreateComponent} from "./create/game.create.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {GamePlayComponent} from "./play/game.play.component";
import {MenuModule} from "../menu/menu.module";
import {BrowserModule} from "@angular/platform-browser";
import {GameModule} from "../game/game.module";
import {KeyPipe} from "./create/game.create.transform.pipe";
import {MaterialDesignModule} from "../materialdesign.module";

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    MenuModule,
    BrowserModule,
    RouterModule,
    GameModule,
    MaterialDesignModule
  ],
  declarations: [
    GameListComponent,
    GameCreateComponent,
    GamePlayComponent,
    GameListFilterPipe,
    KeyPipe
  ],
  providers: [],
  exports: []
})
export class GamesModule {
}

export const gameRoutes = <Routes>[
  {
    path: "create",
    component: GameCreateComponent
  },
  {
    path: "play/:id",
    component: GamePlayComponent
  },
  {
    path: ":status",
    component: GameListComponent
  },
  {
    path: "",
    component: GameListComponent
  },
];

