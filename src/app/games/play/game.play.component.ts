import {Component, OnInit, OnDestroy} from "@angular/core";
import {ApiService} from "../../api/api.service";
import {Game} from "../../models/game";
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";
import {Tile} from "../../models/tile";
import {Match} from "../../models/match";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Component({
  selector: "app-game-play",
  templateUrl: "./game.play.component.html",
  styleUrls: [
    "./game.play.component.scss"
  ]
})
export class GamePlayComponent implements OnInit, OnDestroy {

  sockets: SocketService;
  game: Game;
  tiles: Tile[];
  selectedTile: Tile;
  startTiles: Tile[];
  seenMatches: string[];
  history: number;
  action: string;


  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router, private snackBar: MdSnackBar) {
    this.history = 0;
  }

  ngOnInit() {
    // This page is the BOARD, the lobby waiting for a game to start & the detail page -> as it is the same as the lobby

    this.route.params.subscribe(params => {
      this.sockets = new SocketService(params["id"]);

      this.getGameData(params["id"]);

      // start -> recollect all game data
      this.sockets.start().subscribe(data => {
        console.log(data);
        this.getGameData(params["id"]);
        // popup
        this.popup("Match Started!");
      });
      // end -> recollect all game data
      this.sockets.end().subscribe(data => {
        this.getGameData(params["id"]);
        // popup
        this.popup("Match Over!");
      });
      // player joined -> refresh player names
      this.sockets.playerJoined().subscribe(data => {
        console.log(data);
        const u = new User(data);
        this.game.players.push(u);
        // popup
        this.popup(u.name + " joined!");

      });
      // match -> redraw board
      this.sockets.match().subscribe(data => {
        this.addMatch(data[0]._id, data[1]._id, data[0].match.foundOn, data[0].match.foundBy);
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
            this.action = "Lobby";
            // todo turn off clicks/hover
          }).catch(err => {
            console.error(err);
          });
        } else if (this.game.state === "playing" || this.game.state === "finished") {
          // game is in progress, get game tiles
          this.api.games.gameTiles(this.game._id, false).then(tiles => {
            this.tiles = tiles;

            // filter out the already matched tiles
            const matches = tiles.filter(t => {
              return t.match !== null && t.match.foundBy !== null;
            }).sort((a, b) => {
              return a.match.foundOn.getTime() - b.match.foundOn.getTime();
            });

            this.seenMatches = [];
            for (let i = 0; i < matches.length; i++) {
              this.addMatch(matches[i]._id, matches[i].match.otherTileId,
                matches[i].match.foundOn, matches[i].match.foundBy);

            }
            // provide the framework with data
            console.log(this.tiles);
          });

          if (this.game.state === "playing") {
            if (this.game.curUserInGame()) {
              // PLAYING
              this.action = "Playing";
            } else {
              // SPECTATING
              this.action = "Spectating";
              // todo turn off clicks/hover
            }
          } else {
            // History
            this.action = "History";
            // todo turn off clicks/hover
          }

        }

      }
    ).catch(err => {
      console.error(err);
    });
  }

  private addMatch(id1: string, id2: string, foundOn: Date, foundBy: string) {
    if (this.seenMatches.indexOf(id1) === -1 && this.seenMatches.indexOf(id2) === -1) {
      this.seenMatches.push(id1);
      this.seenMatches.push(id2);


      for (const t of this.tiles) {
        if (t._id === id1 || t._id === id2) {
          t.hidden = true;
        }
      }
      // Isolate the two matched tiles
      const tiles: Tile[] = this.tiles.filter(function (tile) {
        return tile._id === id1 || tile._id === id2;
      });

      // Create new match
      const m = new Match();

      // Set tiles
      if (tiles[0]._id === id1) {
        m.tile1 = Object.assign({}, tiles[0]);
        m.tile2 = Object.assign({}, tiles[1]);
      } else {
        m.tile1 = Object.assign({}, tiles[1]);
        m.tile2 = Object.assign({}, tiles[0]);
      }

      // Set finder
      m.foundOn = foundOn;

      if (this.history !== 0) {
        this.history++;
      }
      this.game.addMatch(m, foundBy);

    }
  }

  ngOnDestroy() {
    this.sockets.close();
  }

  previous() {

    const match = this.game.getLastMatch(this.history);
    for (const t of this.tiles) {
      if (t._id === match.tile1._id || match.tile2._id === t._id) {
        t.hidden = false;
      }
    }
    this.history++;
  }

  next() {
    this.history--;
    const match = this.game.getLastMatch(this.history);

    for (const t of this.tiles) {
      if (t._id === match.tile1._id || match.tile2._id === t._id) {
        t.hidden = true;
      }
    }
  }

  start() {
    this.popup("Starting game");
    this.api.games.startGame(this.game._id);
  }

  private popup(string) {
    this.snackBar.open(string, null, <MdSnackBarConfig>{
      duration: 2000
    });
  };

  delete() {
    this.popup("Deleting game");
    this.api.games.deleteGame(this.game._id).then(c => {
      if (c === true) {
        this.router.navigate(["games"]);
      }
    });
  }

  leave() {
    this.popup("Leaving game");

    this.api.games.leaveGame(this.game._id).then(c => {
      this.router.navigate(["games"]);
    });
  }
}
