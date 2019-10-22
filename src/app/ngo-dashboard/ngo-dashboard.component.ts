import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngo-dashboard',
  templateUrl: './ngo-dashboard.component.html',
  styleUrls: ['./ngo-dashboard.component.css']
})
export class NgoDashboardComponent implements OnInit {
    currentUser: any
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
