import {Component, Input, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {Match} from "../../models/match";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {

  @Input() player: User;
  @Input() matches: Match[];

  constructor() {
  }

  ngOnInit() {
  }

}
