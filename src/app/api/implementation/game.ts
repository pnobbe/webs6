import {GameState} from "../../models/game-state";
import {GameTemplate} from "../../models/game-template";
import {Game} from "../../models/game";
import {Connection} from "./connection";
import {Http} from '@angular/http';
import {Tile} from "../../models/tile";

export class GameApi extends Connection {


  public constructor(http:Http) {
    super(http);
  }


  public getGames():Promise<Game[]> {
    let games:Game[] = [];
    return new Promise((resolve, reject) => {
      this.get('games').subscribe(response => {
        if (response.ok) {
          response.json().forEach(object => games.push(new Game(object)));
          return resolve(games);
        }

        reject();
      }, reject);
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
          return resolve(game);
        }
        reject(response.json());
      }, reject);
    });
  }

  public getGame(gameId:string):Promise<Game> {
    return new Promise((resolve, reject) => {

      this.get(`games/${gameId}`).subscribe(response => {
        if (response.ok) {
          return resolve(new Game(response.json()));
        }
        reject();
      }, reject);

    });
  }

  public deleteGame(gameId:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.delete(`games/${gameId}`).subscribe(response => {
        if (response.ok) {
          return resolve(true);
        }
        resolve(false);
      }, reject);
    });
  }

  public startGame(gameId:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.post(`games/${gameId}/start`).subscribe(response => {
        if (response.ok) {
          return resolve(true);
        }
        resolve(false);
      }, reject);
    });
  }

  public joinGame(gameId:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.post(`games/${gameId}/players`).subscribe(response => {
        if (response.ok) {
          return resolve(true);
        }
        resolve(false);
      }, reject);
    });
  }

  public leaveGame(gameId:string):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.delete(`games/${gameId}/players`).subscribe(response => {
        console.log(response);
        if (response.ok) {
          return resolve(true);
        }

        resolve(false);
      }, reject);
    });
  }

  public gameTiles(gameId:string, matched?:boolean):Promise<Tile[]> {
    const params = [];

    if (matched !== null) {
      params['matched'] = matched;
    }

    return new Promise((resolve, reject) => {
      this.get(`games/${gameId}/tiles`).subscribe(response => {
        if (response.ok) {
          const tiles = [];
          response.json().forEach(object => tiles.push(new Game(object)));
          return resolve(tiles);
        }
        reject();
      }, reject);
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
      }, reject);
    });
  }

}
