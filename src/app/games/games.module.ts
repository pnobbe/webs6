import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameListComponent} from "./list/game.list.component";
import {GameCreateComponent} from "./create/game.create.component";
import {  Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {GamePlayComponent} from "./play/game.play.component";
import {MenuModule} from "../menu/menu.module";
import { BrowserModule } from '@angular/platform-browser';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    MenuModule,
    BrowserModule,
  ],
  declarations: [
    GameListComponent,
    GameCreateComponent,
    GamePlayComponent
  ],
  providers: [],
  exports: []
})
export class GamesModule {


}

export const gameRoutes = <Routes>[
  {
    path: '',
    component: GameListComponent
  },
  {
    path: 'create',
    component: GameCreateComponent
  },
  {
    path: 'play/:id',
    component: GamePlayComponent
  }
];

