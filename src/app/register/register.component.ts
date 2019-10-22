import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service';
import { Router } from '@angular/router';
import { Register } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regModel: any

  registrationModel: Register = new Register()
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
