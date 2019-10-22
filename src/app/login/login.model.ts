export class LoginModel{
    username: String;
    password: String;
}

export interface dataResponse {
    token:String
    user:{
        username: String;
        activeProfile: String;
        userType:String;
    }
  }