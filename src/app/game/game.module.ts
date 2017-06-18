import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GameBoardComponent} from "./board/game.board.component";
import {GameTileComponent} from "./tile/game.tile.component";
import {MenuModule} from "../menu/menu.module";
import {GameTileOrderBy} from "./board/game.board.orderby.pipe";
import {MaterialDesignModule} from "../materialdesign.module";

@NgModule({

  imports: [
    CommonModule,
    MenuModule,
    MaterialDesignModule
  ],
  declarations: [GameBoardComponent, GameTileComponent, GameTileOrderBy],
  providers: [],
  exports: [GameBoardComponent]
})
export class GameModule {
}

