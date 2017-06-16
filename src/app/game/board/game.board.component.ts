import {Component, Input, OnInit} from "@angular/core";
import {Tile} from "../../models/tile";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiService} from "../../api/api.service";

@Component({
  selector: "app-board",
  templateUrl: "./game.board.component.html",
  styleUrls: ["./game.board.component.scss"]
})
export class GameBoardComponent implements OnInit {

  @Input() tiles: Tile[];
  @Input() clickable: boolean;
  private sanitizer: DomSanitizer;

  constructor(private sanitizer1: DomSanitizer, private api: ApiService) {
    this.sanitizer = sanitizer1;
  }

  ngOnInit() {

  }

  getColor(tile: Tile) {
    return this.sanitizer.bypassSecurityTrustStyle(tile.getColor());
  }

  getImageURL(tile: Tile) {
    const url = this.api.sprites.getSprite(tile);
    return url;
  }

}
