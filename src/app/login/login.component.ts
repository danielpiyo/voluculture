import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { LoginModel, dataResponse } from './login.model';
import { Router } from '@angular/router';
import { Register, RegistrationPayload } from '../register/register.model';
import { AlertService } from '../_service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode = 'login';
  loginDetails: LoginModel = new LoginModel()
  registratioModel: Register = new Register()
  registratioPayload: RegistrationPayload = new RegistrationPayload()
  regmodel: any;
  loading = false
  categoryReg: any;
  currentPerson: any;
  // responce interface

  constructor(
    private loginService: LoginService,
    private router: Router,
    private aleratService: AlertService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.getCategories();
  }

  registrationForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    surname: new FormControl(''),
    categpry: new FormControl(''),
    password: new FormControl(''),
    cpassword: new FormControl('')
  });

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      username: ['', Validators.required],
      category: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    })
  }

  getCategories() {
    this.loginService.getCategories()
      .subscribe((response) => {
        this.categoryReg = response
        console.log('cat', this.categoryReg);
      })
  }

  login() {
    this.loading = true;
    this.loginService.ngoLogin(this.loginDetails)
      .subscribe((data: dataResponse) => {
        console.log(data)
        console.log(data.user)
        this.currentPerson = data.user;
        if (data.token) {
          // storing the token
          localStorage.setItem('currentToken', JSON.stringify(data.token));
          localStorage.setItem('currentUser', JSON.stringify(data.user))
          switch (this.currentPerson.ENTITY_CATEGORY) {
            case 'NGO':
              this.aleratService.success('You have succesfully Loged In as an NGO')
              this.router.navigate(['/dashboard']);
              break;
            case 'VOLUNTEER':
              this.aleratService.success('You have succesfully Loged In as an Volunteer But wait Kidogo tu!!. I am working out your pages')
              this.router.navigate(['']);
              this.loading = false;
             this.openSnackBar();
              break;
          }
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
    this.loading = true
    const formData = this.registrationForm.value;

    const payload: RegistrationPayload = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      surname: formData.surname,
      category: formData.category
    }
    console.log(payload);
    this.loginService.registerVolu(payload)
      .subscribe((response) => {
        this.loading = false
        this.aleratService.success('You have succesfully register with us. Please verify the link sent to your email');
        console.log(response)
        this.mode = 'login'
      }, error => {
        this.loading = false;
        this.aleratService.error(error.error.message)
        this.mode = 'signup'
        console.log(error);
      })

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  // snackbar
  openSnackBar() {
    this._snackBar.open( "Hey we are setting up Volunteers pages soon things will be fine","It's Ok", {duration:4000});
  }
}
