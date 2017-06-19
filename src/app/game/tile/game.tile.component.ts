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
  @Input() size: number;
  @Input() tile: Tile;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
  }

  get getId(): string {
    if (this.tile && this.tile._id) {
      return this.tile._id;
    }
    return "";
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

  get getClasses(): string {
    let classes = "tile ";
    if (this.tile.selectable) {
      classes += "selectable ";
    }
    if (this.tile.historyTile) {
      classes += "history ";
    }
    return classes;
  }

  onClick(tile: Tile) {
    if (tile.tile && this.tile.selectable) {
      this.tile.selected = !this.tile.selected;
      this.onSelected.emit(tile);
      return;
    }
    console.log("Tile is not clickable");
  }

}
