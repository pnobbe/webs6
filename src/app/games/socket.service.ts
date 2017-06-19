import * as io from "socket.io-client";
import {Observable} from "rxjs/Observable";

export class SocketService {

  private url = "http://mahjongmayhem.herokuapp.com?gameId=";
  // shared socket
  private socket;

  // counting usage (Semaphore style)
  private counter = 0;

  constructor(private gameId: string) {
    this.socket = io(this.url + gameId);
  }

  private create(name: string) {
    this.counter++;
    const observable = new Observable(observer => {

      this.socket.on(name, (data) => {
        observer.next(data);
      });
      return () => {
        this.counter--;
      };
    });
    return observable;
  }

  start() {
    return this.create("start");
  }

  end() {
    return this.create("end");
  }

  playerJoined() {
    return this.create("playerJoined");
  }

  match() {
    return this.create("match");
  }

  close() {
    if (this.counter !== 0) {
      console.log("There are still open socket observables.");

    }
    this.socket.disconnect();
  }


}
