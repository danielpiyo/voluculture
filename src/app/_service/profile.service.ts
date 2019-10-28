import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgoProfile } from '../ngo-dashboard/home/organisation.model';
import { environment } from 'src/environments/environment';
import { Token } from '../ngo-dashboard/home/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  creatProfile(ngoDetails: NgoProfile){
    return this.http.post(`${environment.baseUrl}/newProfile`,ngoDetails)
  }
  getProfileData(token:Token){
    return this.http.post(`${environment.baseUrl}/myProfiledetails`,token)
  }

  // submiting data
  updateProfile(updateDate: NgoProfile){
    return this.http.post(`${environment.baseUrl}/updateProfile`, updateDate)
  }

  createNgoProfile(ngoDetails:NgoProfile){
    return this.http.post(`${environment.baseUrl}/updateProfileNgo`, ngoDetails )
  }
}
