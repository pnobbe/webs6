import {Component, Output, EventEmitter, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api/api.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit {
  public title = "Space Mayhem";
  @Output() themeUpdated = new EventEmitter();

  public theme = "";
  constructor(private router: Router, private api: ApiService) {

  }

  ngOnInit(): void {
    if (!this.api.users.isLoggedIn) {
      this.router.navigate(["login"]);
    }
  }

  setTheme(event): void {
    console.log(event.value);
    this.themeUpdated.emit(event.value);
  }

  logout(): void {
    this.api.users.logout();
    this.router.navigate(["login"]);
  }
}
