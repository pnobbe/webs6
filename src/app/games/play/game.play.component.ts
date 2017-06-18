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
    // This page is the BOARD, the lobby waiting for a game to start & the detail page -> as it is the same as the lobby

    this.route.params.subscribe(params => {
      this.sockets = new SocketService(params["id"]);

      this.getGameData(params["id"]);

      // start -> recollect all game data
      this.sockets.start().subscribe(data => {
        console.log(data);
      });
      // end -> recollect all game data
      this.sockets.end().subscribe(data => {
        console.log(data);
      });
      // player joined -> refresh player names
      this.sockets.playerJoined().subscribe(data => {
        console.log(data);
      });
      // match -> redraw board
      this.sockets.match().subscribe(data => {
        console.log(data);
        this.splice(data[0]._id);
        this.splice(data[1]._id);
      });
    });
  }

  match(tileId1: string, tileId2: string) {
    this.api.games.matchTiles(this.game._id, tileId1, tileId2).then(response => {
      console.log(response);
    }).catch(err => {
      console.error(err);
    });
  }

  private getGameData(id: string) {

    // load data
    this.api.games.getGame(id).then(newGame => {

      if (newGame == null) {
        return alert("Something went wrong!");
      }
      this.game = newGame;

      // get tiles
      if (this.game.state === "open") {
        // game is in lobby, get template
        this.api.templates.getTemplate(this.game.gameTemplate.id).then(template => {
          this.tiles = template.tiles;
        }).catch(err => {
          console.error(err);
        });
      } else if (this.game.state === "playing") {
        // game is in progress, get game tiles
        this.api.games.gameTiles(this.game._id, false).then(tiles => {
          this.tiles = tiles;

          // filter out the already matched tiles
          this.api.games.gameTiles(this.game._id, true).then(matchedTiles => {

            for (let i = 0; i < matchedTiles.length; i++) {
              this.splice(matchedTiles[i]._id);
            }
            // provide the framework with data
            console.log(this.tiles);
          });
        }).catch(err => {
          console.error(err);
        });
      }
    }).catch(err => {
      console.error(err);
    });
  }

  private splice(id: string) {
    const result = this.tiles.filter(function (tile) {
      return tile._id === id;
    });
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      console.log(result[i]._id + " " + this.tiles(this.tiles.indexOf(result[i])));
      this.tiles.splice(this.tiles.indexOf(result[i], 1));
    }
  }

  ngOnDestroy() {
    this.sockets.close();
  }

}
