import {Match} from "../../../models/match";
import {Tile} from "../../../models/tile";
import {Game} from "../../../models/game";
import {SocketService} from "../../socket.service";
import {ApiService} from "../../../api/api.service";

export abstract class GameInitHelper {

  public sockets: SocketService;
  public api: ApiService;
  public game: Game;
  public tiles: Tile[];
  public seenMatches: string[];
  public history: number;
  public action: string;

  public getGameData(id: string) {

    // load data
    const self = this;
    return this.api.games.getGame(id).then(newGame => {

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
          });

          if (this.game.state === "playing") {
            if (this.game.curUserInGame()) {
              // PLAYING
              this.action = "Playing";
            } else {
              // SPECTATING
              this.action = "Spectating";
            }
          } else {
            // History
            this.action = "History";
          }

        }

      }
    ).catch(err => {
      console.error(err);
    });
  }

  protected addMatch(id1: string, id2: string, foundOn: Date, foundBy: string) {
    if (this.seenMatches.indexOf(id1) === -1 && this.seenMatches.indexOf(id2) === -1) {
      this.seenMatches.push(id1);
      this.seenMatches.push(id2);

      if (this.history === 0) {
        for (const t of this.tiles) {
          if (t._id === id1 || t._id === id2) {
            t.hidden = true;
          }
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

      m.tile1.selectable = false;
      m.tile1.hint = false;
      m.tile1.selected = false;

      m.tile2.selectable = false;
      m.tile2.hint = false;
      m.tile2.selected = false;

      // Set finder
      m.foundOn = foundOn;

      if (this.history !== 0) {
        this.history++;
      }
      this.game.addMatch(m, foundBy);

    }
  }
}
