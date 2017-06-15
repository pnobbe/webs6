import {Tile} from "./tile";
export class GameTemplate {
  id: string;
  tiles: Tile[];

  constructor(values: Object = {}) {
    Object.assign(this, values);

    this.tiles = this.tiles == null ? <Tile[]>[] : this.tiles.map(tile => {
      return new Tile(tile);
    });
  }
}
