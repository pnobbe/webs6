import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../api/api.service";
import {Game} from "../../models/game";
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";
import {Tile} from "../../models/tile";
import {Match} from "../../models/match";

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
  selectedTile: Tile;
  startTiles: Tile[];
  seenMatches: string[];


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
        this.addMatch(data[0]._id, data[1]._id, data[0].match.foundOn, data[0].match.foundBy);

        this.tiles = this.tiles.filter(function (tile) {
          return tile._id !== data[0]._id && tile._id !== data[1]._id;
        });
      });
    });
  }

  onSelected(tile: Tile) {
    if (!this.selectedTile) {
      console.log("Selected first tile.");
      this.selectedTile = tile;
    } else {
      console.log("Selected second tile.");
      const selTile = this.selectedTile;
      this.selectedTile = null;
      if (selTile.matches(tile)) {
        this.api.games.matchTiles(this.game._id, selTile._id, tile._id);
      }

    }
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
          this.startTiles = tiles;

          // filter out the already matched tiles
          this.api.games.gameTiles(this.game._id, true).then(matchedTiles => {
            this.seenMatches = [];
            for (let i = 0; i < matchedTiles.length; i++) {
              this.addMatch(matchedTiles[i]._id, matchedTiles[i].match.otherTileId,
                matchedTiles[i].match.foundOn, matchedTiles[i].match.foundBy);

              this.startTiles = this.startTiles.filter(function (tile) {
                return tile._id !== matchedTiles[i]._id;
              });
            }

            this.tiles = this.startTiles;
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

  private addMatch(id1: string, id2: string, foundOn: Date, foundBy: string) {
    if (this.seenMatches.indexOf(id1) === -1 && this.seenMatches.indexOf(id2) === -1) {
      this.seenMatches.push(id1);
      this.seenMatches.push(id2);

      // Isolate the two matched tiles
      const tiles: Tile[] = this.startTiles.filter(function (tile) {
        return tile._id === id1 || tile._id === id2;
      });

      // Create new match
      const m = new Match();

      // Set tiles
      if (tiles[0]._id === id1) {
        m.tile1 = tiles[0];
        m.tile2 = tiles[1];
      } else {
        m.tile1 = tiles[1];
        m.tile2 = tiles[0];
      }

      // Set finder
      m.foundOn = foundOn;

      // Add to the game's list of matches
      if (!this.game.matches[foundBy]) {
        this.game.matches[foundBy] = [];
      }
      this.game.matches[foundBy].push(m);
    }
  }

  ngOnDestroy() {
    this.sockets.close();
  }

}
