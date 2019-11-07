import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Opportunity } from '../ngo-dashboard/home/opportunity.model';
import { Activity } from '../ngo-dashboard/home/activity.model';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  constructor(
    private http: HttpClient
  ) { }

  createOpportunity(oppDetails: Opportunity) {
    return this.http.post(`${environment.baseUrl}/createOpp`, oppDetails);
  }

  createEvent(activityDetails: Activity) {
    return this.http.post(`${environment.baseUrl}/createActivity`, activityDetails);
  }

  // get activity/Event  categories
  getCategories() {
    return this.http.get(`${environment.baseUrl}/categoryEvents`);
  }
// getting my posted opportunities
getMypostedOpportunities(entityId: any) {
  return this.http.post(`${environment.baseUrl}/myopportunities`, entityId);
}

}
