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
import {LoggerComponent} from "./logger/logger.component";
import {ScrollGlue} from "./logger/scrollglue.directive";
import {GameBoardComponent} from "../game/board/game.board.component";
import {GamePlayBoardComponent} from "./play/board/game.play.board.component";
import {GamePlayHistoryComponent} from "./play/history/game.play.history.component";
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
    GamePlayBoardComponent,
    GamePlayHistoryComponent,
    GameListFilterPipe,
    KeyPipe,
    LoggerComponent,
    ScrollGlue,

  ],
  providers: [],
  exports: []
})
export class GamesModule {
}

const playSubRoutes = <Routes>[
  {
    path: "",
    component: GamePlayComponent
  },
  {
    path: "board",
    component: GamePlayBoardComponent
  },
  {
    path: "history",
    component: GamePlayHistoryComponent
  }
];

export const gameRoutes = <Routes>[
  {
    path: "create",
    component: GameCreateComponent
  },
  {
    path: "play/:id",
    children: playSubRoutes
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

