import {Component, OnChanges, Input, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ApiService} from "app/api/api.service";
import {Game} from "app/models/game";
import {Router} from "@angular/router";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {SocketService} from "../socket.service";
import {Subscription} from "rxjs/Subscription";
import {ScrollGlue} from "./scrollglue.directive";

@Component({
  selector: "app-logger",
  templateUrl: "./logger.component.html",
  styleUrls: [
    "./logger.component.scss",
  ]
})
export class LoggerComponent implements OnChanges, OnDestroy {

  @Input() games: Game[];

  sockets: Subscription[][];
  services: SocketService[];
  logger: string[];

  constructor() {
    this.logger = [];
    this.sockets = [];
    this.services = [];
  }

  ngOnChanges() {
    this.ngOnDestroy();
    this.logger = [];
    this.sockets = [];
    this.services = [];

    if (this.games) {


      for (const game of this.games) {
        console.log("added " + game._id);
        const service = new SocketService(game._id);
        this.services[game._id] = service;
        this.sockets[game._id] = [];

        this.sockets[game._id].push(this.observableHandler(service.start(), game._id + ": Game started!", (c) => {
          return "";
        }));
        this.sockets[game._id].push(this.observableHandler(service.playerJoined(), game._id + ": Player joined.", (c) => {
          return c.name;
        }));
        this.sockets[game._id].push(this.observableHandler(service.match(), game._id + ": Match found by ", (c) => {
          return c[0].match.foundBy;
        }));
        this.sockets[game._id].push(this.observableHandler(service.end(), game._id + ": Game has ended", (c) => {
          return "";
        }));
        this.logger.push("added game: " + game._id);


      }
    }
  }

  ngOnDestroy() {
    for (const sockets of this.sockets) {
      for (const socket of sockets) {
        socket.unsubscribe();
      }
    }

    for (const service of this.services) {
      service.close();
    }
  }

  private observableHandler(obs: Observable<any>, prefix: string, dataparser: any): Subscription {

    return obs.subscribe(c => {
      this.logger.push(prefix + dataparser(c));
    });
  }


}
