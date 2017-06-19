import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Tile} from "../../models/tile";

@Component({
  selector: "app-board",
  templateUrl: "./game.board.component.html",
  styleUrls: ["./game.board.component.scss"]
})
export class GameBoardComponent implements OnInit {

  @Input() tiles: Tile[];
  @Input() clickable: boolean;
  @Output() onTileSelected = new EventEmitter<Tile>();

  constructor() {
  }

  ngOnInit() {
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
