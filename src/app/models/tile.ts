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
    return (this.xPos * (this.getWidth() / 2.2))  + (this.zPos * this.getWidth() / 8) + 50;
  }

  getYPos() {
    return (this.yPos * (this.getHeight() / 2.2)) - (this.zPos * this.getHeight() / 8);
  }

  getHeight() {
    return this.getWidth() * 1.37;
  }

  getWidth() {
    return 75;
  }

  getColor() {
    const red = (this.zPos + 1) * 50;
    const green = (this.zPos + 1) * 0;
    const blue = (this.zPos + 1) * 0;
    return "fill: rgb(" + red + "," + green + "," + blue + ");";
  }

}
