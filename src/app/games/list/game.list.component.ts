import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ApiService} from "app/api/api.service";
import {Game} from "app/models/game";
import {Router} from "@angular/router";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Component({
  selector: "app-game-list",
  templateUrl: "./game.list.component.html",
  styleUrls: [
    "./game.list.component.scss",
  ]
})
export class GameListComponent implements OnInit {

  games: Game[];

  status: string;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private snackBar: MdSnackBar) {
  }

  ngOnInit(): void {
    const self = this;

    this.route.params.subscribe(params => {
      if (params["status"]) {
        status = params["status"];
        console.log(status);
      }
      this.api.games.getGames().then(games => {
        this.games = games;
      });
    });

  }

  delete(game: Game) {
    const self = this;
    this.api.games.deleteGame(game._id).then(success => {
      if (success) {
        self.popup("Deleted Game!");
        self.games = self.games.filter(g => {
          return g._id !== game._id;
        });
      }
    });
  }

  play(game: Game) {
    this.router.navigate(["games", "play", game._id]);
  }

  view(game: Game) {
    this.router.navigate(["games", "play", game._id]);
  }

  spectate(game: Game) {
    this.router.navigate(["games", "play", game._id]);
  }

  leave(game: Game) {
    this.popup("leaving game (dummy. api werkt niet)");
    const self = this;
    this.api.games.leaveGame(game._id).then(success => {
      if (success === true) {
        game.players = game.players.filter((data => data._id !== self.api.users.getMe()._id));
      }
    });
  }

  start(game: Game) {

    const self = this;
    this.api.games.startGame(
      game._id).then(success => {
      if (success === true) {
        self.popup("Started Game!");
        game.state = "playing";
        game.startedOn = Date.now().toString();
      }
    });
  }

  join(game: Game) {

    const self = this;
    this.api.games.joinGame(game._id).then(success => {
      if (success === true) {
        self.popup("Joined Game!");
        game.players.push(self.api.users.getMe());
      }
    });
  }

  getStatus() {
    return status;
  }

  getUser() {
    return this.api.users.getMe()._id;
  }

  private popup(string) {
    this.snackBar.open(string, null, <MdSnackBarConfig>{
      duration: 2000
    });
  };

  toggleFavorite(game: Game) {
    game.isFavorite = !game.isFavorite;
    console.log(game.isFavorite);
  }


}
