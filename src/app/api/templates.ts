import {GameState} from "../models/game-state";
import {GameTemplate} from "../models/game-template";
import {Game} from "../models/game";
import {Connection} from "./connection";
import {Http} from '@angular/http';
import {Tile} from "../models/tile";

export class TemplateApi extends Connection {


  public constructor( http:Http) {
    super(http);
  }

  public gameTemplates:GameTemplate[] = [];
  public gameStates:GameState[] = [];

  public getTemplates():Promise<GameTemplate[]> {
    return new Promise((resolve, reject) => {
      if (this.gameTemplates.length > 0) {
        return resolve(this.gameTemplates);
      }

      this.get('gameTemplates').subscribe(response => {
        if (response.ok) {
          response.json().forEach(object => this.gameTemplates.push(new GameTemplate(object)));
          return resolve(this.gameTemplates);
        }

        reject();
      });
    });
  }

  public getTemplate(template:string):Promise<GameTemplate> {
    return new Promise((resolve, reject) => {
      this.getTemplates().then(templates => {
        const temp = templates.find((gameTemplate:GameTemplate) => gameTemplate.id === template);

        if (!temp) {
          return resolve(temp);
        }
        reject();
      }, reject);
    });
  }

  public getStates():Promise<GameState[]> {
    return new Promise((resolve, reject) => {
      if (this.gameStates.length > 0) {
        return resolve(this.gameStates);
      }

      this.get('gamestatus').subscribe(response => {
        if (response.ok) {
          response.json().forEach(object => this.gameStates.push(new GameState(object)));
          return resolve(this.gameStates);
        }

        reject();
      });
    });
  }

}
