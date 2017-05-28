import {User} from './user' ;
import {GameTemplate} from './game-template';
import {Tile} from './tile';

export class Game {
  _id: string;
  gameTemplate: GameTemplate;
  createdOn: string;
  startedOn: string;
  endedOn: string;
  createdBy: User;
  minPlayers: number;
  maxPlayers: number;
  players: User[];
  state: string;
  tiles: Tile[];


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
