import {Component, OnDestroy, OnInit} from "@angular/core";
import {ApiService} from "../../api/api.service";
import {Game} from "../../models/game";
import {ActivatedRoute, Router} from "@angular/router";
import {SocketService} from "../socket.service";
import {Tile} from "../../models/tile";
import {Match} from "../../models/match";
import {User} from "../../models/user";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {FilterSelectablePipe} from "../../game/board/game.board.selectable.pipe";
import {FilterHiddenTilePipe} from "../../game/board/game.board.filter.pipe";
import {GameInitHelper} from "./helper/game.init.helper";

@Component({
  selector: "app-game-play",
  templateUrl: "./game.play.component.html",
  styleUrls: [
    "./game.play.component.scss"
  ]
})
export class GamePlayComponent extends GameInitHelper implements OnInit, OnDestroy {


  selectedTile: Tile;

  constructor(public api: ApiService, private route: ActivatedRoute, private router: Router, private snackBar: MdSnackBar) {
    super();
    this.history = 0;
  }

  ngOnInit() {

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

  onTiles(tiles) {
    this.tiles = tiles;
  }

  ngOnDestroy() {
    this.sockets.close();
  }

  getGame() {
    return this.game;
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
