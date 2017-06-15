import {GameState} from "../../models/game-state";
import {GameTemplate} from "../../models/game-template";
import {Connection} from "./connection";
import {Http} from "@angular/http";

export class TemplateApi extends Connection {


  public constructor(http: Http) {
    super(http);
  }


  public getTemplates(): Promise<GameTemplate[]> {
    return new Promise((resolve, reject) => {

      const gameTemplates: GameTemplate[] = [];

      this.get("gameTemplates").subscribe(response => {
        if (response.ok) {
          response.json().forEach(object => gameTemplates.push(new GameTemplate(object)));
          return resolve(gameTemplates);
        }

        reject();
      }, reject);
    });
  }

  public getTemplate(template: string): Promise<GameTemplate> {
    return new Promise((resolve, reject) => {

      this.get(`gameTemplates/${template}`).subscribe(response => {
        if (response.ok) {
          return resolve(new GameTemplate(response.json()));
        }
        reject();
      }, reject);

    });
  }

  public getStates(): Promise<GameState[]> {
    return new Promise((resolve, reject) => {
      const gameStates: GameState[] = [];
      this.get("gamestatus").subscribe(response => {
        if (response.ok) {
          response.json().forEach(object => gameStates.push(new GameState(object)));
          return resolve(gameStates);
        }

        reject();
      }, reject);
    });
  }

}
