import {Component, Input, OnInit} from "@angular/core";
import {Tile} from "../../models/tile";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiService} from "../../api/api.service";
import {GamePlayComponent} from "../../games/play/game.play.component";

@Component({
  selector: "app-board",
  templateUrl: "./game.board.component.html",
  styleUrls: ["./game.board.component.scss"]
})
export class GameBoardComponent implements OnInit {

  @Input() tiles: Tile[];
  private selectedTile: Tile;

  constructor(private sanitizer: DomSanitizer, private api: ApiService, private game: GamePlayComponent) {
  }

  ngOnInit() {

  }

  get getHeight(): number {
    return this.getWidth;
  }

  get getWidth(): number {
    return 1000;
  }

  tryMatch(tile: Tile) {
    if (!this.selectedTile) {
      this.selectedTile = tile;
      console.log("Selected first tile.");
    } else {
      const selTile = this.selectedTile;
      this.selectedTile = null;
      if (selTile.tryMatch(tile)) {
        this.game.match(selTile._id, tile._id);
      }
    }
  }

}
