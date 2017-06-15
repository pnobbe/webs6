import {Component, Input, OnInit} from "@angular/core";
import {Tile} from "../../models/tile";

@Component({
  selector: "app-board",
  templateUrl: "./game.board.component.html",
  styleUrls: ["./game.board.component.scss"]
})
export class GameBoardComponent implements OnInit {

  @Input() tiles: Tile[];
  @Input() clickable: boolean;

  constructor() { }

  ngOnInit() {
  }

}
