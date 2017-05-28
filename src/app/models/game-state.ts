export class GameState {
  state: string;
  count: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
