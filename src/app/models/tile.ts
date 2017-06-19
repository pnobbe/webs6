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

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  matches(tile: Tile): boolean {
    if (this._id !== tile._id) {
      if (this.tile.suit === tile.tile.suit) {
        if (this.tile.name === tile.tile.name || (this.tile.matchesWholeSuit || tile.tile.matchesWholeSuit)) {
          console.log("Tiles matched!");
          return true;
        }
        console.error("Tiles do not match.");
        return false;
      }
      console.error("Selected tiles have no matching suit.");
      return false;
    }
    console.log("Deselecting tile");
    return false;
  }

}
