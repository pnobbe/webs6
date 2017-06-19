import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GameBoardComponent} from "./board/game.board.component";
import {GameTileComponent} from "./tile/game.tile.component";
import {MenuModule} from "../menu/menu.module";
import {GameTileOrderBy} from "./board/game.board.orderby.pipe";
import { PlayerComponent } from './player/player.component';
import { MatchComponent } from './match/match.component';
import {Match} from "../models/match";

@NgModule({

  imports: [
    CommonModule,
    MenuModule,
  ],
  declarations: [GameBoardComponent, GameTileComponent, GameTileOrderBy, PlayerComponent, MatchComponent],
  providers: [],
  exports: [GameBoardComponent, PlayerComponent, MatchComponent]
})
export class GameModule {
}

