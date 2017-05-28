import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api/api.service';
import {Game} from '../../models/game';
import {ActivatedRoute, Params} from '@angular/router';
import {Tile} from '../../models/tile';

@Component({
  selector: 'game-play',
  templateUrl: './game.play.component.html',
  styleUrls: [
    './game.play.component.css'
  ],
  providers: [
    ApiService
  ]
})
export class GamePlayComponent implements OnInit {

  game: Game;

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {

  }

}
