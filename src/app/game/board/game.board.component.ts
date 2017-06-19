import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
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
  @Output() onTileSelected = new EventEmitter<Tile>();

  constructor() {
  }

  ngOnInit() {
    console.log(this.tiles);
  }

  get getHeight(): number {
    return 550;
  }

  get getWidth(): number {
    return this.getHeight * 1.37;
  }

  onSelected(tile: Tile) {
    this.onTileSelected.emit(tile);
  }

}
