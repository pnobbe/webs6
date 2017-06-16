import {Component, Input, OnInit} from "@angular/core";
import {Tile} from "../../models/tile";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: "app-board",
  templateUrl: "./game.board.component.html",
  styleUrls: ["./game.board.component.scss"]
})
export class GameBoardComponent implements OnInit {

  @Input() tiles: Tile[];
  @Input() clickable: boolean;
  private sanitizer: DomSanitizer;

  constructor(private sanitizer1: DomSanitizer) {
    this.sanitizer = sanitizer1;
  }

  ngOnInit() {

  }

  getColor(tile: Tile) {
    const color = tile.getColor();

    return this.sanitizer.bypassSecurityTrustStyle(color);
  }

}
