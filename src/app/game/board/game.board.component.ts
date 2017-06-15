import {Component, OnInit} from "@angular/core";
import {Game} from "../../models/game";

@Component({
  selector: "app-board",
  templateUrl: "./game.board.component.html",
  styleUrls: ["./game.board.component.scss"]
})
export class GameBoardComponent implements OnInit {

  game: Game;

  constructor() { }

  ngOnInit() {
  }

}
