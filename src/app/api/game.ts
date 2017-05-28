import {GameState} from "../models/game-state";
import {GameTemplate} from "../models/game-template";
import {Game} from "../models/game";
import {Connection} from "./connection";
import {Http} from '@angular/http';
import {Tile} from "../models/tile";

export class GameApi extends Connection {


  public constructor(http:Http) {
    super(http);
  }

  public games:Game[] = [];

  public getGames():Promise<Game[]> {
    return new Promise((resolve, reject) => {
      this.get('games').subscribe(response => {
        if (response.ok) {
          response.json().forEach(object => this.games.push(new Game(object)));
          return resolve(this.games);
        }

        reject();
      });
    });
  }

  public createGame(template:string, minPlayers:number, maxPlayers:number):Promise<Game> {
    return new Promise((resolve, reject) => {
      this.post('games', {
        'templateName': template,
        'minPlayers': minPlayers,
        'maxPlayers': maxPlayers
      }).subscribe(response => {
        if (response.ok) {
          const game = new Game(response.json());
          this.games.push(game);
          return resolve(game);
        }

        reject();
      });
    });
  }

  public getGame(gameId:string):Promise<Game> {
    return new Promise((resolve, reject) => {
      const temp = this.games.find(game => game._id === gameId);

      if (!temp) {
        this.get(`games/${gameId}`).subscribe(response => {
          if (response.ok) {
            return resolve(new Game(response.json()));
          }

          reject();
        }, reject);
      } else {
        resolve(temp);
      }
    });
  }

  public deleteGame(gameId:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.delete(`games/${gameId}`).subscribe(response => {
        if (response.ok) {
        // TODO
          return resolve(true);
        }

        reject(false);
      });
    });
  }

  public startGame(gameId:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.post(`games/${gameId}/start`).subscribe(response => {
        if (response.ok) {
          // TODO
          return resolve(true);
        }

        reject(false);
      });
    });
  }

  public joinGame(gameId:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.post(`games/${gameId}/players`).subscribe(response => {
        if (response.ok) {
         // TODO
          return resolve(true);
        }

        reject(false);
      });
    });
  }

  public leaveGame(gameId:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.delete(`games/${gameId}/players`).subscribe(response => {
        console.log(response);
        if (response.ok) {
          // TODO
          return resolve(true);
        }

        reject(false);
      });
    });
  }

  public gameTiles(gameId:string, matched?:boolean):Promise<Tile[]> {
    const params = [];

    if (matched !== null) {
      params['matched'] = matched;
    }

    return new Promise((resolve, reject) => {
      this.get(`games/${gameId}/tiles`, params).subscribe(response => {
        if (response.ok) {
          const tiles = [];
          response.json().forEach(object => tiles.push(new Game(object)));
          return resolve(tiles);
        }

        reject();
      });
    });
  }

  public matchTiles(gameId:string, tile1Id:string, tile2Id:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.put(`games/${gameId}/tiles`, {
        tile1Id: tile1Id,
        tile2Id: tile2Id
      }).subscribe(response => {
        if (response.ok) {
          return resolve(response.json());
        }

        reject();
      });
    });
  }

}
