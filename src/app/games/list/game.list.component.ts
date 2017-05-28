import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

// Services
import {ApiService} from 'app/api/api.service';
import {Game} from 'app/models/game';
import {Router} from '@angular/router';

@Component({
  selector: 'game-list',
  templateUrl: './game.list.component.html',
  styleUrls: [
    './game.list.component.css',
  ],
  providers: [
    ApiService
  ]
})
export class GameListComponent implements OnInit {

  games:Game[];


  constructor(private api:ApiService, private router:Router) {
  }

  ngOnInit():void {
    this.api.games.getGames().then(games => this.games = games);
  }

  delete(game:Game) {
  }

  play(game:Game) {
    this.router.navigate([`games/${game._id}/play`]);
  }

  leave(game:Game) {
  }

  start(game:Game) {
  }

  join(game:Game) {
  }

}
