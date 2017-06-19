import {Tile} from "./tile";
export class Match {
  tile1: Tile;
  tile2: Tile;
  foundOn: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
