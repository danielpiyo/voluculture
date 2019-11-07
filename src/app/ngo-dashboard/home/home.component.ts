import { Component, OnInit, Inject } from '@angular/core';
import { NgoProfile } from './organisation.model';
import { User, Token } from './user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/_service';
import { ProfileService } from 'src/app/_service/profile.service';
import { Router } from '@angular/router';
import { Opportunity } from './opportunity.model';
import { OpportunityService } from 'src/app/_service/opportunity.service';
import { Activity } from './activity.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mode: string ;
  currentUser: User;
  currentUserToken: any;
  model: any;
  ngoProfile: NgoProfile = new NgoProfile();
  step = 0;
  ngoPulledData: any;
  loading = false;
  requireToken: Token = new Token();

  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserToken = JSON.parse(localStorage.getItem('currentToken'));
    this.checkProfile();
    }

  ngOnInit() {
    console.log(this.currentUser);
  }

  // check profile update condition
  checkProfile() {
    // tslint:disable-next-line: triple-equals
    if (this.currentUser.PROFILE_SET_YN != 'N') {
      this.requireToken.token = this.currentUserToken;
      this.profileService.getProfileData(this.requireToken)
        .subscribe((response) => {
          console.log('profile', response);
          this.ngoPulledData = response;
          this.mode = 'already-set';
        },
          error => {
            this.loading = false;
            console.log(error.error.message);
            this.alertService.error(error.error.message);
          });
    } else {
      this.mode = 'set';
      console.log('profile set', this.currentUser.PROFILE_SET_YN);
    }
  }


  // navigating from one input to the next
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  // submiting the profile
  submitProfile() {
    this.model = this.ngoProfile.fyear.getFullYear();
    this.ngoProfile.fyear = this.model;
    this.ngoProfile.token = this.currentUserToken;
    console.log('payload', this.ngoProfile);
    this.profileService.createNgoProfile(this.ngoProfile)
      .subscribe((response) => {
        this.loading = true;
        console.log(response);
        this.alertService.success('You have successfully updated your Profile');
        this.getNgoProfile();
      },
        error => {
          this.loading = false;
          console.log(error.message);
          this.alertService.error(error.message);
        });
  }

  // getting ngo profile details

  getNgoProfile() {
    this.requireToken.token = this.currentUserToken;
    this.profileService.getProfileData(this.requireToken)
      .subscribe((response) => {
        console.log('profile', response);
        this.ngoPulledData = response;
        this.mode = 'already-set';
      },
        error => {
          this.loading = false;
          console.log(error.error.message);
          this.alertService.error(error.error.message);
        });
  }
  // opening Modal
  openDialog(): void {

    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(Modal, {
      data: {
        org_name: this.ngoPulledData[0].ORG_NAME,
        town: this.ngoPulledData[0].TOWN,
        country: this.ngoPulledData[0].COUNTRY,
        description: this.ngoPulledData[0].BRIEF_NARRATION,
        url: this.ngoPulledData[0].url,
        fyear: this.ngoPulledData[0].FOUNDED_YEAR,
        location: this.ngoPulledData[0].CAPTURED_LOCATION,
        phone: this.ngoPulledData[0].MOBILE_NUMBER,
        address: this.ngoPulledData[0].ADDRESS,
        vission: this.ngoPulledData[0].VISSION,
        mission: this.ngoPulledData[0].MISSION,
        we_do: this.ngoPulledData[0].WE_DO,
        we_are: this.ngoPulledData[0].WE_ARE
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  // opportuity
  addOpportunity() {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open(OpportunityModal);
  }

  // Activity
  addActivity() {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open(ActivityModal);
  }
}

// child component for modal
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'modal',
  templateUrl: 'modal.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class Modal {
  model: any;
  currentUserToken: any;
  requireToken: Token = new Token();
  step = 0;
  ngoEditProfile: NgoProfile = new NgoProfile();

  constructor(
    public dialogRef: MatDialogRef<Modal>,
    private profileService: ProfileService,
    private alertService: AlertService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUserToken = JSON.parse(localStorage.getItem('currentToken'));

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // navigating from one input to the next
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  // submiting the edited profile
  submitEditedProfile() {
    this.ngoEditProfile = this.data;
    this.ngoEditProfile.token = this.currentUserToken;
    console.log('edited', this.ngoEditProfile);
    console.log('edited', this.ngoEditProfile.token);
    this.profileService.createNgoProfile(this.ngoEditProfile)
      .subscribe((response) => {
        this.alertService.success('Details updated succesfully');
        this.router.navigate(['/dashboard']);
      });
  }

  // Adding opportunity
}

// child component for opportunity modal
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'opportunity-modal',
  templateUrl: 'opportunity.modal.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class OpportunityModal {
  year: any;
  day: any;
  month: any;
  oppToSubmit: Opportunity = new Opportunity();
  currentUser: User;
  currentToken: any;

  constructor(
    public dialogRef: MatDialogRef<OpportunityModal>,
    private alertService: AlertService,
    private router: Router,
    private opportunityService: OpportunityService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.currentToken = JSON.parse(localStorage.getItem('currentToken'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitOpportunity() {
    // formating the date
    this.day = this.oppToSubmit.opp_start.getDay();
    this.month = this.oppToSubmit.opp_start.getMonth();
    this.year = this.oppToSubmit.opp_start.getFullYear();
    // mapping the right variables
    this.oppToSubmit.entity_sys_id = this.currentUser.ENTITY_SYS_ID;
    this.oppToSubmit.token = this.currentToken;
    this.oppToSubmit.opp_start = this.year + '-' + this.month + '-' + this.day;
    console.log(this.oppToSubmit);
    this.opportunityService.createOpportunity(this.oppToSubmit)
    .subscribe((response) => {
      console.log('response', response);
      this.router.navigate(['/dashboard/opportunities']);
      this.onNoClick();
    },
    error => {
      console.log(error.error.message);
    });
  }
}

// child component for Activity modal
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'activity-modal',
  templateUrl: 'activity.modal.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class ActivityModal {

  categoryEvent: any;
  actToSubmit: Activity = new Activity();
  day: any;
  month: any;
  year: any;
  currentUser: User;
  currentToken: any;

  constructor(
    public dialogRef: MatDialogRef<ActivityModal>,
    private alertService: AlertService,
    private activitiesServices: OpportunityService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentToken = JSON.parse(localStorage.getItem('currentToken'));
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategories() {
    this.activitiesServices.getCategories()
    .subscribe((response) => {
      this.categoryEvent = response;
    }, error => {
      console.log('Error', error);
    });
  }
  postActivities() {
    console.log('ToSubmit', this.actToSubmit);
    this.day = this.actToSubmit.act_start.getDay();
    this.month = this.actToSubmit.act_start.getMonth();
    this.year = this.actToSubmit.act_start.getFullYear();
    this.actToSubmit.act_start = this.year + '-' + this.month + '-' + this.day;
    this.actToSubmit.token = this.currentToken;
    this.actToSubmit.entity_sys_id = this.currentUser.ENTITY_SYS_ID;
    this.activitiesServices.createEvent(this.actToSubmit)
    .subscribe((res) => {
      console.log('Res', res);
      this.onNoClick();
    }, error => {
      console.log('Error when submiting', error);
    });
  }
}
