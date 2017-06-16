import {Component, OnInit} from "@angular/core";
import {Game} from "app/models/game";
import {GameTemplate} from "app/models/game-template";
import {ApiService} from "app/api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-game-create",
  templateUrl: "./game.create.component.html",
  styleUrls: [
    "./game.create.component.scss",
  ]
})
export class GameCreateComponent implements OnInit {

  gameTemplates: GameTemplate[] = [];
  model: Game;

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.newGame();

    this.api.templates.getTemplates().then(templates => {
      this.gameTemplates = templates;
    });
  }

  onSubmit() {
    this.api.games.createGame(this.model.gameTemplate.id, this.model.minPlayers, this.model.maxPlayers).then(game => {
      if (game == null) {
        return alert("Something went wrong!");
      }
      this.router.navigate(["games"]);
    }).catch(err => {
      // TODO err.errors contains array of errors. show beautiful
      alert(err);
      console.log(err);
    });
  }

  newGame() {
    this.model = new Game({gameTemplate: new GameTemplate()});
    this.model.minPlayers = 1;
  }
}
