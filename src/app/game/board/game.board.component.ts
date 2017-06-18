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
  private selectedTile: Tile;

  constructor(private sanitizer: DomSanitizer, private api: ApiService) {
  }

  ngOnInit() {

  }

  get getHeight(): number {
    return this.getWidth;
  }

  get getWidth(): number {
    return 1000;
  }

  onSelected(tile: Tile) {
    this.onTileSelected.emit(tile);
  }

}
