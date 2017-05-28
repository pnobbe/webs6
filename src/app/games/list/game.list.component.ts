import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

// Services
import {ApiService} from 'app/api/api.service';
import {Game} from 'app/models/game';
import {Router} from '@angular/router';
import {RouteBag} from "../../routeBag.service";

@Component({
  selector: 'game-list',
  templateUrl: './game.list.component.html',
  styleUrls: [
    './game.list.component.css',
  ]
})
export class GameListComponent implements OnInit {

  games:Game[];


  constructor(private api:ApiService, private router:Router, private routebag:RouteBag) {
  }

  ngOnInit():void {
    const self = this;
    this.api.games.getGames().then(games => {
      this.games = games;

      if (self.routebag.getData("createGame") != null) {
        if (this.games.filter(data => {
            return data._id == self.routebag.getData("createGame")._id;
          }).length == 0) {
          this.games.push(self.routebag.getData("createGame"));
        }
      }
      self.routebag.setData("createGame", null);
    });

    // TODO wait for socket calls -> on ANY socket call -> refresh
  }

  delete(game:Game) {
    const self = this;
    this.api.games.deleteGame(game._id).then(success => {
      if (success) {
        this.games = self.games.filter(g => {
          return g._id != game._id;
        })
      }
    })
  }

  details(game:Game) {
    this.router.navigate([`games/${game._id}/play`]);
  }

  play(game:Game) {
    this.router.navigate([`games/${game._id}/play`]);
  }

  leave(game:Game) {
    const self = this;
    this.api.games.leaveGame(game._id).then(success => {
      if (success === true) {
        game.players = game.players.filter((data => data._id != self.api.users.getMe()._id));
      }
    })
  }

  start(game:Game) {
    this.api.games.startGame(game._id).then(success => {
      if (success === true) {
        game.state = "playing";
        game.startedOn = Date.now().toString();
      }
    })
  }

  join(game:Game) {
    const self = this;
    this.api.games.joinGame(game._id).then(success => {
      if (success === true) {
        game.players.push(self.api.users.getMe());
      }
    })
  }

}
