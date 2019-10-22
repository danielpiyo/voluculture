import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { LoginModel, dataResponse } from './login.model';
import { Router } from '@angular/router';
import { Register, RegistrationPayload } from '../register/register.model';
import { AlertService } from '../_service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode = 'login';
  loginDetails: LoginModel = new LoginModel()
  registratioModel : Register = new Register() 
  registratioPayload: RegistrationPayload = new RegistrationPayload()
  regmodel: any;
  loading = false
  // responce interface

  constructor(
    private loginService: LoginService,
    private router: Router,
    private aleratService: AlertService
  ) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.loginService.ngoLogin(this.loginDetails)
      .subscribe((data: dataResponse) => {
        console.log(data)
        console.log(data.user)
        if (data.token) {
          // storing the token
          localStorage.setItem('currentToken', JSON.stringify(data.token));
          localStorage.setItem('currentUser', JSON.stringify(data.user))
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        this.loading = false;
        this.aleratService.error(error.error.message)
        console.log(error)
      })
    // console.log("loged", this.loginDetails)
  }
  // changing to sigup screen
  signUp() {
    this.mode = 'signup';
  }
  // changing to login screen
  signIn() {
    this.mode = 'login'
  }
  // registering function
  registerNow() {
    if(this.registratioModel.cpassword !== this.registratioModel.password){
      this.aleratService.error('Your passwords dont match!!')
      // alert('Your passwords dont match!!')
      this.loading = false;
    }
    else{
    this.registratioPayload.username = this.registratioModel.username
    this.registratioPayload.password = this.registratioModel.password
    this.loading = true;
    this.loginService.registerNgo(this.registratioPayload)
      .subscribe((response)=>{
        this.loading = false;
        this.aleratService.success('Thank you. Registration succesful');        
        console.log('response', response)
        this.mode = 'login'
      },
      error =>{
        this.aleratService.error(error)
        this.loading = false
        this.mode = 'signup'
      }   
      )}
  }
}
