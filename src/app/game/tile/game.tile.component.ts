import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Tile} from "../../models/tile";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiService} from "../../api/api.service";

@Component({
  selector: "g[app-tile]",
  templateUrl: "./game.tile.component.html",
  styleUrls: ["./game.tile.component.scss"]
})
export class GameTileComponent implements OnInit {
  @Output() onSelected = new EventEmitter<Tile>();
  @Input() tile: Tile;
  private selected: boolean;
  private size: number;

  constructor(private sanitizer: DomSanitizer, private api: ApiService) {
    this.selected = false;
    this.size = 1;
  }

  ngOnInit() {
  }

  get getId(): string {
    return this.tile._id;
  }

  get getImageURL(): string {
    return this.api.sprites.getSprite(this.tile);
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
      this.onSelected.emit(tile);
      return;
    }
    console.log("Tile is not clickable");
  }

}
