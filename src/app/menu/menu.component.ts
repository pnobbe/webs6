import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ApiService} from "../api/api.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html"
})
export class MenuComponent implements OnInit {
  public title = "Space Mayhem";

  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit(): void {
    if (this.api.users.email == null) {
      this.router.navigate(["login"]);
    }
  }

  logout(): void {
    this.api.users.logout();
    this.router.navigate(["login"]);
  }
}
