export class GameTemplate {
  id:string;
  tiles:[{
    xPos: number;
    yPos: number;
    zPos: number;
  }];

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
