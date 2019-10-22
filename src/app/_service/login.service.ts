import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../login/login.model';
import { environment } from 'src/environments/environment';
import { RegistrationPayload } from '../register/register.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  ngoLogin(loginDetails: LoginModel){
    return this.http.post(`${environment.baseUrl}/signin`, loginDetails)
    
  }
  // logout function
  logout(){
    localStorage.removeItem('currentToken');
  }
// registration function
registerNgo(register: RegistrationPayload){
  return this.http.post(`${environment.baseUrl}/register`, register)

}

}
