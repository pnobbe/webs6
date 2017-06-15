import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GameBoardComponent} from "./board/game.board.component";
import {GameTileComponent} from "./tile/game.tile.component";
import {MenuModule} from "../menu/menu.module";


@NgModule({

  imports: [
    CommonModule,
    MenuModule,
  ],
  declarations: [GameBoardComponent, GameTileComponent],
  providers: [],
  exports: [GameBoardComponent]
})
export class GameModule {
}

