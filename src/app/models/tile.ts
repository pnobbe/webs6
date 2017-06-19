export class Tile {
  _id: string;
  xPos: number;
  yPos: number;
  zPos: number;
  hidden = false;
  tile: {
    _id: number;
    suit: string;
    name: string;
    matchesWholeSuit: boolean;
  };
  match: {
    foundBy: string;
    foundOn: Date;
    otherTileId: string;
  };
  selectable: boolean;
  hint: boolean;
  historyTile: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    if (this.match !== null && this.match !== undefined) {
      this.match.foundOn = this.match.foundOn == null ? null : new Date(this.match.foundOn);
    } else {
      this.match = null;
    }
    this.selectable = false;
    this.hint = false;
    this.historyTile = false;
  }

  matches(tile: Tile): boolean {

    if (this._id !== tile._id) {
      if (this.tile.suit === tile.tile.suit) {
        if (this.tile.name === tile.tile.name || (this.tile.matchesWholeSuit || tile.tile.matchesWholeSuit)) {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  }

}
