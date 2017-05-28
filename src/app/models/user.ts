export class User {
  _id:string;
  name:string;
  numberOfMatches:number;

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}
