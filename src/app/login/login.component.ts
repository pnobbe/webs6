import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-selector',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.api.users.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  public login() {
    location.href = this.api.users.loginUrl;
  }

}
