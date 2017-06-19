import {Component} from "@angular/core";
import {ApiService} from "./api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-root",
  template: `
  <div  [className]="theme">
    <app-menu *ngIf="this.api.users.isLoggedIn"  (themeUpdated)="handleTheme($event)" ></app-menu>
    <router-outlet></router-outlet>
  </div>`
})
export class AppComponent {

  public theme = "space-theme";

  constructor(private api: ApiService, private router: Router) {
    console.log(this.router.url);
  }

  handleTheme(theme) {
    this.theme = theme;
  }

}
