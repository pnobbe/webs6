import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api/api.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  providers: [
    ApiService
  ]
})
export class MenuComponent implements OnInit {
  title = 'WEBS6: Mahjong';

  constructor(private router: Router, private api: ApiService) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('user-email')) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.api.users.logout();
    this.router.navigate(['login']);
  }
}
