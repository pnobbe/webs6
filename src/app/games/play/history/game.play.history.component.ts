import {Component, OnDestroy, OnInit, Input, OnChanges, Output,EventEmitter} from "@angular/core";
import {ApiService} from "../../../api/api.service";
import {Game} from "../../../models/game";
import {ActivatedRoute, Router} from "@angular/router";
import {SocketService} from "../../socket.service";
import {Tile} from "../../../models/tile";
import {Match} from "../../../models/match";
import {User} from "../../../models/user";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {FilterSelectablePipe} from "../../../game/board/game.board.selectable.pipe";
import {FilterHiddenTilePipe} from "../../../game/board/game.board.filter.pipe";
import {GameInitHelper} from "../helper/game.init.helper";

@Component({
  selector: "app-game-play-history",
  templateUrl: "./game.play.history.component.html",
  styleUrls: [
    "./game.play.history.component.scss"
  ]
})
export class GamePlayHistoryComponent extends GameInitHelper implements OnInit, OnDestroy, OnChanges {

  @Input() inpTiles: Tile[];
  @Input() inpHistory: number;
  @Input() inpGame: Game;
  @Input() inpSeenMatches: string[];

  @Output() outTiles = new EventEmitter<Tile[]>();

  constructor(public api: ApiService, private route: ActivatedRoute, private router: Router, private snackBar: MdSnackBar) {
    super();
    this.history = 0;
  }

  ngOnInit() {
    // This page is the BOARD, the lobby waiting for a game to start & the detail page -> as it is the same as the lobby

    this.route.params.subscribe(params => {
      this.sockets = new SocketService(params["id"]);

      if (this.inpGame !== undefined) {
        this.tiles = this.inpTiles;
        this.game = this.inpGame;
        this.history = this.inpHistory;
        this.seenMatches = this.inpSeenMatches;
        return;
      }

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

  ngOnChanges() {
    this.tiles = this.inpTiles;
    this.game = this.inpGame;
    this.history = this.inpHistory;
    this.seenMatches = this.inpSeenMatches;
  }

  ngOnDestroy() {
    if (this.sockets) {
      this.sockets.close();
    }
  }

  previous() {

    const match = this.game.getLastMatch(this.history);
    for (const t of this.tiles) {
      if (t._id === match.tile1._id || match.tile2._id === t._id) {
        t.hidden = false;
        t.hint = false;
        t.selectable = false;
        t.historyTile = true;
      }
    }

    this.history++;
    this.outTiles.emit(this.tiles);
  }

  next() {
    this.history--;
    const match = this.game.getLastMatch(this.history);

    for (const t of this.tiles) {
      if (t._id === match.tile1._id || match.tile2._id === t._id) {
        t.hidden = true;

      }
    }
    this.outTiles.emit(this.tiles);
  }

  private popup(string) {
    this.snackBar.open(string, null, <MdSnackBarConfig>{
      duration: 2000
    });
  };
}
