import {Component, Input, OnInit} from "@angular/core";
import {Tile} from "../../models/tile";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiService} from "../../api/api.service";
import {GameBoardComponent} from "../board/game.board.component";

@Component({
  selector: "g[app-tile]",
  templateUrl: "./game.tile.component.html",
  styleUrls: ["./game.tile.component.scss"]
})
export class GameTileComponent implements OnInit {

  @Input() tile: Tile;
  private sanitizer: DomSanitizer;
  private selected: boolean;
  private size: number;
  private board: GameBoardComponent;

  constructor(private sanitizer1: DomSanitizer, private api: ApiService, private board1: GameBoardComponent) {
    this.sanitizer = sanitizer1;
    this.selected = false;
    this.board = board1;
    this.size = 1;
  }

  ngOnInit() {
  }

  get getId(): string {
    return this.tile._id;
  }

  get getImageURL(): string {
    const url = this.api.sprites.getSprite(this.tile);
    return url;
  }

  get getXPos(): number {
    return (this.tile.xPos * (this.getWidth / 2.2)) + (this.tile.zPos * this.getWidth / 8);
  }

  get getYPos(): number {
    return (this.tile.yPos * (this.getHeight / 2.2)) - (this.tile.zPos * this.getHeight / 8);
  }

  get getHeight(): number {
    return this.getWidth * 1.37;
  }

  get getWidth(): number {
    return (50 * this.size);
  }

  onClick(tile: Tile) {
    if (tile.tile) {
      console.log("Clicked " + tile.tile.suit + " " + tile.tile.name + " " + tile._id);
      this.board.tryMatch(tile);
      return;
    }

    console.log("Tile is not clickable");
  }

}
