import { Component, OnInit, Inject } from '@angular/core';
import { NgoProfile } from './organisation.model';
import { User, Token } from './user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertService } from 'src/app/_service';
import { ProfileService } from 'src/app/_service/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mode: string = 'already-set';
  currentUser: User;
  currentUserToken: any
  model: any;
  ngoProfile: NgoProfile = new NgoProfile()
  step = 0;
  ngoPulledData: any;
  loading = false;
  requireToken: Token = new Token()

  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private profileService: ProfileService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserToken = JSON.parse(localStorage.getItem('currentToken'));
    this.checkProfile();
    this.getNgoProfile();

  }

  ngOnInit() {
    console.log(this.currentUser)
  }

  // check profile update condition
  checkProfile() {
    if (this.currentUser.activeProfile !== 'N' ||this.currentUser.activeProfile !== null) {
      this.mode = 'already-set';
    }
    if(this.currentUser.activeProfile !== 'Y'){
      this.mode ='set'
    }
    else {
      this.mode = 'complications';
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
    this.model = this.ngoProfile.fyear.getFullYear()
    this.ngoProfile.fyear = this.model;
    this.ngoProfile.token = this.currentUserToken;
    console.log('payload', this.ngoProfile);
    this.profileService.creatProfile(this.ngoProfile)
    .subscribe((response)=>{
      this.loading = true;
      console.log(response);
      this.alertService.success('You have successfully updated your Profile');
      this.getNgoProfile()
    },
    error=>{
      this.loading = false;
      console.log(error.message);
      this.alertService.error(error.message);
    })    
  }

  // getting ngo profile details

  getNgoProfile(){
    this.requireToken.token = this.currentUserToken;
    this.profileService.getProfileData(this.requireToken)
    .subscribe((response)=>{
      console.log('profile', response)
      this.ngoPulledData = response
      this.mode = 'already-set'
    },
    error=>{
      this.loading = false;
      console.log(error.error.message);
      this.alertService.error(error.error.message);
    })
  }
  // opening Modal
  openDialog(): void {
  
    let dialogRef = this.dialog.open(Modal, {
      data: { org_name: this.ngoPulledData[0].org_name,
        email:this.ngoPulledData[0].email,
        description :this.ngoPulledData[0].description,
        url :this.ngoPulledData[0].url,
        fyear :this.ngoPulledData[0].fyear,
        location :this.ngoPulledData[0].location,
        phone :this.ngoPulledData[0].phone,
        address :this.ngoPulledData[0].address,
        mvision :this.ngoPulledData[0].mvision,
        we_do :this.ngoPulledData[0].we_do,
        we_are :this.ngoPulledData[0].we_are       
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

// child component for modal
@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
})
export class Modal {
  model: any;
  currentUserToken: any;
  requireToken: Token = new Token()
  step = 0;
  ngoEditProfile: NgoProfile = new NgoProfile();

  constructor(
    public dialogRef: MatDialogRef<Modal>,
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
    this.ngoEditProfile = this.data
    this.ngoEditProfile.token = this.currentUserToken;
    console.log("edited", this.ngoEditProfile);
    console.log("edited", this.ngoEditProfile.token);
  }
  
  // getting profile
  
}