export class Tile {
  _id: string;
  xPos: number;
  yPos: number;
  zPos: number;
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
  hidden = false;
  selectable: boolean;
  hint: boolean;
  historyTile: boolean;
  selected: boolean;

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
    this.selected = false;
  }

  matches(tile: Tile): boolean {
    if (this._id !== tile._id) {
      if (this.tile.suit === tile.tile.suit) {
        return (this.tile.name === tile.tile.name || (this.tile.matchesWholeSuit || tile.tile.matchesWholeSuit));
      }
      return false;
    }
    return false;
  }

}
