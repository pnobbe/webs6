import {Component, OnDestroy, OnInit, Input, OnChanges} from "@angular/core";
import {ApiService} from "../../../api/api.service";
import {Game} from "../../../models/game";
import {ActivatedRoute, Router} from "@angular/router";
import {SocketService} from "../../socket.service";
import {Tile} from "../.././../models/tile";
import {Match} from "../../../models/match";
import {User} from "../../../models/user";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {FilterSelectablePipe} from "../../../game/board/game.board.selectable.pipe";
import {FilterHiddenTilePipe} from "../../../game/board/game.board.filter.pipe";
import {GameInitHelper} from "../helper/game.init.helper";

@Component({
  selector: "app-game-play-board",
  templateUrl: "./game.play.board.component.html",
  styleUrls: [
    "./game.play.board.component.scss"
  ]
})
export class GamePlayBoardComponent extends GameInitHelper implements OnInit, OnDestroy, OnChanges {


  selectedTile: Tile;
  @Input() inpTiles: Tile[];
  @Input() inpGame: Game;
  @Input() inpAction: string;
  @Input() history: number;

  constructor(protected api: ApiService, private route: ActivatedRoute, private router: Router, private snackBar: MdSnackBar) {
    super();
    this.history = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      if (this.game !== undefined) {
        this.game = this.inpGame;
        this.tiles = this.inpTiles;
        this.action = this.inpAction;
        return;
      }
      console.log("OWN INFO");
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

  ngOnChanges() {
    this.game = this.inpGame;
    this.tiles = this.inpTiles;
    this.action = this.inpAction;
    if (this.selectedTile) {
      this.selectedTile.selected = false;
      this.selectedTile = null;
    }

  }

  onSelected(tile: Tile) {
    if (!this.selectedTile) {
      this.selectedTile = tile;
    } else {
      if (this.selectedTile.matches(tile)) {
        this.api.games.matchTiles(this.game._id, this.selectedTile._id, tile._id).then(data => {
          this.selectedTile.selected = false;
          tile.selected = false;
          this.selectedTile = null;
        });
      } else {
        this.selectedTile.selected = false;
        this.selectedTile = null;
        tile.selected = false;
        this.popup("Tiles do not match!");
      }
    }
  }

  private getHint() {
    const filterPipe = new FilterSelectablePipe();
    const hiddenPipe = new FilterHiddenTilePipe();
    let selectables = hiddenPipe.transform(this.tiles, null);
    selectables = filterPipe.transform(selectables, true).filter(tile => {
      return tile.selectable === true;
    });

    for (let i = 0; i < selectables.length; i++) {
      for (let j = i; j < selectables.length; j++) {
        if (selectables[i].matches(selectables[j])) {
          selectables[i].hint = true;
          selectables[j].hint = true;
          return;
        }
      }
    }
    this.popup("Unable to find any matches, game should be over.");
  }

  ngOnDestroy() {
    if (this.sockets) {
      this.sockets.close();
    }

  }


  private popup(string) {
    this.snackBar.open(string, null, <MdSnackBarConfig>{
      duration: 2000
    });
  };

}
