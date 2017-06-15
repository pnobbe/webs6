import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../api/api.service";
import {Game} from "../../models/game";
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";

@Component({
  selector: "app-game-play",
  templateUrl: "./game.play.component.html",
  styleUrls: [
    "./game.play.component.scss"
  ]
})
export class GamePlayComponent implements OnInit {

  game:Game;
  sockets:SocketService;

  constructor(private api:ApiService, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params["id"]);

      this.sockets = new SocketService(params["id"]);
      // load data
      this.api.games.getGame(params["id"]).then(game => {
        if (game == null) {
          return alert("Something went wrong!");
        }

        // do shit


      }).catch(err => {
        // TODO err.errors contains array of errors. show beautiful
        alert(err);
        console.log(err);
      });
    });

    // TODO wait for socket calls ->
    // start -> recollect all game data
    // end -> recollect all game data
    // player joined -> refresh player names
    // match -> redraw board

    // This page is the BOARD, the lobby waiting for a game to start & the detail page -> as it is the same as the lobby
  }

  ngOnDestroy() {
    this.sockets.close()
  }

}
