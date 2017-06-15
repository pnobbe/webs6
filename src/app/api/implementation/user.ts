import {Connection} from "./connection";
import {Http} from "@angular/http";
import {User} from "../../models/user";

export class UserApi extends Connection {


  public constructor(http: Http, private document: any) {
    super(http);
  }

  get loginUrl(): string {
    return this.url("auth/avans") + `/?callbackUrl=${this.document.location.origin}/login/callback`;
  }


  public login(email: string, token: string) {
    // see connection for get/set
    this.email = email;
    this.token = token;
  }

  public listPlayers(gameId: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.get(`games/${gameId}/players`).subscribe(response => {
        if (response.ok) {
          const players = response.json().forEach(object => new User(object));
          return resolve(players);
        }

        reject();
      }, reject);
    });
  }

  public getMe(): User {
    return new User({_id: this.email});
  }

}
