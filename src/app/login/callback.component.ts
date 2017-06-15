import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiService} from '../api/api.service';

@Component({
  template: ''
})
export class LoginCallbackComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {

      this.api.users.login(params['username'], params['token']);
      this.router.navigate(['games']);
    });
  }

}
