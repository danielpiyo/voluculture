import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { OpportunityService } from 'src/app/_service/opportunity.service';
import { User } from '../home/user';
import { Opportunities } from './getOpportunity.model';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent implements OnInit {
  currentUser: User;
  currentToken: any;
  public existingOpportunies: any;
  getOpportunitiesVar: Opportunities = new Opportunities();
  mode = 'existing';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // tslint:disable-next-line: no-use-before-declare
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(
    private opportunitiesService: OpportunityService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentToken = JSON.parse(localStorage.getItem('currentToken'));
   }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getOppportunities();
    this.dataSource.paginator = this.paginator;
  }
  getOppportunities() {
    this.getOpportunitiesVar.entity_sys_id = this.currentUser.ENTITY_SYS_ID;
    this.getOpportunitiesVar.token = this.currentToken;
    this.opportunitiesService.getMypostedOpportunities(this.getOpportunitiesVar)
    .subscribe((response) => {
      this.existingOpportunies = response;
      console.log('opportunities', this.existingOpportunies);
    },
    error => {
      console.log(error);
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = this.e
