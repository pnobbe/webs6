import {Component, OnInit} from "@angular/core";
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";
import {LoginModule} from "./login.module";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.scss"
  ]
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {

    if (this.api.users.isLoggedIn) {
      this.router.navigate([LoginModule.redirectPath]);
    }
  }

  public login() {
    location.href = this.api.users.loginUrl;
  }

}
