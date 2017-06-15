import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api/api.service';
import {Game} from '../../models/game';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game-play-selector',
  templateUrl: './game.play.component.html',
  styleUrls: [
    './game.play.component.css'
  ]
})
export class GamePlayComponent implements OnInit {

  game: Game;

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);

      // load data

      // do shit


    });

    // TODO wait for socket calls ->
    // start -> recollect all game data
    // end -> recollect all game data
    // player joined -> refresh player names
    // match -> redraw board

    // This page is the BOARD, the lobby waiting for a game to start & the detail page -> as it is the same as the lobby
  }

}
