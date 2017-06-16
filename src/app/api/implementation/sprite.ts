import {Connection} from "./connection";
import {Http} from "@angular/http";
import {Tile} from "../../models/tile";

export class SpriteApi extends Connection {

  private dataUrls: string[];
  private suit: number[];
  private name: number[];

  public constructor(http: Http) {
    super(http);
    const self = this;
    self.init();

    const c = <HTMLCanvasElement> document.createElement("canvas");
    const ctx = c.getContext("2d");

    const spriteHeight = 480;
    const spriteWidth = 349;

    c.width = 100;
    c.height = 138;

    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = "http://mahjongmayhem.herokuapp.com//Tiles_sprite3.png";
    img.onload = function () {
      const rows = img.height / spriteHeight;
      for (let i = 0; i < rows; i++) {
        ctx.drawImage(img,
          /*start image info*/ 0, i * spriteHeight, spriteWidth, spriteHeight,
          /*start canvas info*/ 0, 0, 100, 137);

        const srcImage = c.toDataURL();
        ctx.clearRect(0, 0, c.width, c.height);
        self.dataUrls.push(srcImage);
      }
    };
  };

  getSprite(tile: Tile): string {
    if (!tile.tile) {
      return this.dataUrls["29"];
    }
    return this.dataUrls[this.suit[tile.tile.suit] + this.name[tile.tile.name]];
  }

  private init() {
    this.dataUrls = [];
    this.suit = [];
    this.name = [];

    // Suites
    this.suit["Bamboo"] = 0;
    this.suit["Character"] = 9;
    this.suit["Circle"] = 18;
    this.suit["Dragon"] = 27;
    this.suit["Flower"] = 30;
    this.suit["Season"] = 34;
    this.suit["Wind"] = 38;

    // Bamboo/Character/Circle
    this.name["1"] = 1;
    this.name["2"] = 2;
    this.name["3"] = 3;
    this.name["4"] = 4;
    this.name["5"] = 5;
    this.name["6"] = 6;
    this.name["7"] = 7;
    this.name["8"] = 8;
    this.name["9"] = 9;

    // Dragon
    this.name["Green"] = 1;
    this.name["Red"] = 2;
    this.name["White"] = 3;

    // Flower
    this.name["Bamboo"] = 1;
    this.name["Chrysantememum"] = 2;
    this.name["Orchid"] = 3;
    this.name["Plum"] = 4;

    // Season
    this.name["Autumn"] = 1;
    this.name["Spring"] = 2;
    this.name["Summer"] = 3;
    this.name["Winter"] = 4;

    // Wind
    this.name["East"] = 1;
    this.name["North"] = 2;
    this.name["South"] = 3;
    this.name["West"] = 4;
  }


}
