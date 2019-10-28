import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Opportunity } from '../ngo-dashboard/home/opportunity.model';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  constructor(
    private http: HttpClient
  ) { }

  createOpportunity(oppDetails: Opportunity){
    return this.http.post(`${environment.baseUrl}/createOpp`,oppDetails)
  }
}
