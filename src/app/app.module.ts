import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login/callback.component';
import { GamePlayComponent } from './games/play/game.play.component';
import { GameCreateComponent } from './games/create/game.create.component';
import { GameListComponent } from './games/list/game.list.component';
import { MenuComponent } from './menu/menu.component';
import {ApiService} from "./api/api.service";
import {RouteBag} from "./routeBag.service";

const appRoutes:Routes = <Routes>[
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/callback',
    component: LoginCallbackComponent
  },
  {
    // no endpoint == login endpoint
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: GameListComponent
  },
  {
    path: 'games/create',
    component: GameCreateComponent
  },
  {
    path: 'games/:id/play',
    component: GamePlayComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameCreateComponent,
    GamePlayComponent,
    LoginComponent,
    LoginCallbackComponent,
    MenuComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ApiService, RouteBag], // its here because its a beautiful singleton.
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
