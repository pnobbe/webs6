import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../api/api.service";
import {Game} from "../../models/game";
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";
import {Tile} from "../../models/tile";

@Component({
  selector: "app-game-play",
  templateUrl: "./game.play.component.html",
  styleUrls: [
    "./game.play.component.scss"
  ]
})
export class GamePlayComponent implements OnInit {

  sockets: SocketService;
  game: Game;
  tiles: Tile[];


  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params["id"]);

      this.sockets = new SocketService(params["id"]);
      // load data
      this.api.games.getGame(params["id"]).then(newGame => {
        if (newGame == null) {
          return alert("Something went wrong!");
        }

        this.game = newGame;
        console.dir(this.game);

        // get tiles
        if (this.game.state === "open") {
          // game is in lobby, get template
          this.api.templates.getTemplate(this.game.gameTemplate.id).then(template => {
            this.tiles = template.tiles;
          }).catch(err => {
            console.error(err);
          });
        } else if (this.game.state === "playing") {
          // game is in progress, get game times
          this.api.games.gameTiles(this.game._id, false).then(tiles => {
            console.dir(tiles);
            this.tiles = tiles;
          }).catch(err => {
            console.error(err);
          });
        }
      }).catch(err => {
        console.error(err);
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
    this.sockets.close();
  }

}
