import {Match} from "./match";
export class User {
  _id: string;
  name: string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
