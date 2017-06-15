import {Component, OnInit} from "@angular/core";
// Services
import {ApiService} from "app/api/api.service";
import {Game} from "app/models/game";
import {Router} from "@angular/router";

@Component({
  selector: "app-game-list",
  templateUrl: "./game.list.component.html",
  styleUrls: [
    "./game.list.component.scss",
  ]
})
export class GameListComponent implements OnInit {

  games: Game[];


  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    const self = this;
    this.api.games.getGames().then(games => {
      this.games = games;
    });

    // TODO wait for socket calls -> on ANY socket call -> refresh
  }

  delete(game: Game) {
    const self = this;
    this.api.games.deleteGame(game._id).then(success => {
      if (success) {
        this.games = self.games.filter(g => {
          return g._id !== game._id;
        });
      }
    });
  }

  details(game: Game) {
    console.log("Show a div somewhere on page with all game info");
    alert("see console");
  }

  play(game: Game) {
    this.router.navigate(["games", "play", game._id]);
  }

  leave(game: Game) {
    const self = this;
    this.api.games.leaveGame(game._id).then(success => {
      if (success === true) {
        game.players = game.players.filter((data => data._id !== self.api.users.getMe()._id));
      }
    });
  }

  start(game: Game) {
    this.api.games.startGame(game._id).then(success => {
      if (success === true) {
        game.state = "playing";
        game.startedOn = Date.now().toString();
      }
    });
  }

  join(game: Game) {
    const self = this;
    this.api.games.joinGame(game._id).then(success => {
      if (success === true) {
        game.players.push(self.api.users.getMe());
      }
    });
  }

}
