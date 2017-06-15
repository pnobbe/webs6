import {Component, OnInit} from "@angular/core";
import {Tile} from "../../models/tile";

@Component({
  selector: "app-tile",
  templateUrl: "./game.tile.component.html",
  styleUrls: ["./game.tile.component.scss"]
})
export class GameTileComponent implements OnInit {

  tile: Tile;
  
  constructor() {
  }

  ngOnInit() {
  }

}
