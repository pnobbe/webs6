import {Component} from "@angular/core";
import {ApiService} from "./api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-root",
  template: `
  <div id="app" [className]="theme">
  <div class="header-screen"></div>
  <div class="main">
    <app-menu *ngIf="this.api.users.isLoggedIn"  (themeUpdated)="handleTheme($event)" ></app-menu>
    <div class="box container">
     <router-outlet></router-outlet>
    </div>

  </div>

  </div>`
})
export class AppComponent {

  public theme = "space-theme";

  constructor(private api: ApiService, private router: Router) {
    console.log(this.router.url);

    const audio = new Audio("assets/bgmusic.mp3");
    audio.loop = true;
    audio.play();
  }

  handleTheme(theme) {
    this.theme = theme;
  }

}
