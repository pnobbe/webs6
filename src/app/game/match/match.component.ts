import {Component, Input, OnInit} from "@angular/core";
import {Match} from "../../models/match";


@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {

  @Input() match: Match;

  constructor() {
  }

  ngOnInit() {
    if (!this.match) {
      console.log("Match created without match?!");
      return;
    }
    if (this.match.tile1) {
      this.match.tile1.xPos = 0;
      this.match.tile1.zPos = 0;
      this.match.tile1.yPos = 0;
    }
    if (this.match.tile2) {

      this.match.tile2.xPos = 1;
      this.match.tile2.zPos = 0;
      this.match.tile2.yPos = 1;
    }
  }

}
