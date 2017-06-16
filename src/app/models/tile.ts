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

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  getXPos() {
    return this.xPos * 20;
  }

  getYPos() {
    return (this.yPos * 20) - (this.zPos * 10);
  }

  getColor() {
    const red = (this.zPos + 1) * 50;
    const green = (this.zPos + 1) * 0;
    const blue = (this.zPos + 1) * 0;
    console.log("rgb(" + red + "," + green + "," + blue + ");stroke-width:1;stroke:rgb(0,0,0);");
    return "fill: rgb(" + red + "," + green + "," + blue + "); stroke-width:1;stroke:rgb(0,0,0);";
  }

}
