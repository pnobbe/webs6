import {User} from "./user";
import {GameTemplate} from "./game-template";
import {Tile} from "./tile";
import {ApiService} from "../api/api.service";
import {Match} from "./match";

export class Game {
  _id: string;
  gameTemplate: GameTemplate;
  createdOn: string;
  startedOn: string;
  endedOn: string;
  createdBy: User;
  minPlayers: number;
  maxPlayers: number;
  players: User[];
  state: string;
  tiles: Tile[];
  matches: Match[][];

  matchesHistory = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);

    this.matches = [];

    // casting
    this.players = this.players == null ? <User[]>[] : this.players.map(user => {
      return new User(user);
    });
    this.gameTemplate = new GameTemplate(this.gameTemplate);

    this.tiles = this.tiles == null ? <Tile[]>[] : this.tiles.map(tile => {
      return new Tile(tile);
    });

    this.minPlayers = 2;
    this.maxPlayers = 2;

  }


  set isFavorite(bool: boolean) {
    localStorage.setItem(this._id, bool ? "1" : "0");
  }

  get isFavorite(): boolean {
    const v = localStorage.getItem(this._id);
    return (v == null ? false : v === "1");
  }

  get hasActions(): boolean {
    return this.canJoin || this.canStart
      || this.canPlay || this.canLeave || this.canDelete
      || this.canLobby || this.canSpectate || this.canView;
  }

  get canJoin(): boolean {
    return this.players.length < this.maxPlayers
      && this.state === "open"
      && !this.curUserInGame();
  }

  get canStart(): boolean {
    return this.createdBy._id === ApiService.user_email
      && this.state === "open"
      && this.players.length >= this.minPlayers;
  }

  get canPlay(): boolean {
    return this.curUserInGame()
      && this.state === "playing";
  }

  get canLobby(): boolean {
    return this.curUserInGame()
      && this.state === "open";
  }

  get canSpectate(): boolean {
    return !this.curUserInGame()
      && this.state === "playing";
  }

  get canView(): boolean {
    return this.state === "finished";
  }

  get canLeave(): boolean {
    return this.curUserInGame()
      && this.createdBy._id !== ApiService.user_email
      && this.state === "open";
  }

  get canDelete(): boolean {
    return this.createdBy._id === ApiService.user_email
      && ["open", "finished"].indexOf(this.state) > -1;
  }

  private inGame(email: String): boolean {
    let found = false;
    this.players.forEach(user => {
      if (user._id === email) {
        found = true;
        return false;
      }
    });
    return found;

  }

  public curUserInGame(): boolean {
    return this.inGame(ApiService.user_email);
  }


  // get matches based on history
  public getMatches(playerid, history) {
    return this.matchesHistory.slice(0, this.matchesHistory.length - history).filter(c => {
      return c.player === playerid;
    }).map(c => {
      return c.match;
    });

  }

  public addMatch(match: Match, player: string) {
    this.matchesHistory.push({player: player, match: match});
  }

  public getLastMatch(history) {
    console.dir(this.matchesHistory);
    console.dir(this.matchesHistory.length - history - 1);
    console.dir(this.matchesHistory.length - history);
    return this.matchesHistory.slice(this.matchesHistory.length - history - 1, this.matchesHistory.length - history)[0].match;
  }

}

