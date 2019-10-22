import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { MatSidenavModule, MatBadgeModule, MatSnackBarModule, MatPaginatorModule, MatSortModule, MatToolbarModule, MatChipsModule, MatIconModule, MatListModule, MatCardModule, MatButtonModule, MatTableModule, MatSelectModule, MatInputModule, MatDialogModule, MatProgressBarModule, MatTooltipModule, MatDatepickerModule, MatCheckboxModule, MatExpansionModule, MatSlideToggleModule, MatProgressSpinnerModule, MatDialogConfig, MatNativeDateModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgoDashboardComponent } from './ngo-dashboard/ngo-dashboard.component';
import { HomeComponent, Modal } from './ngo-dashboard/home/home.component';
import { OpportunitiesComponent } from './ngo-dashboard/opportunities/opportunities.component';
import { ProfileComponent } from './ngo-dashboard/profile/profile.component';
import { ContactComponent } from './ngo-dashboard/contact/contact.component';
import { ActivitiesEventsComponent } from './ngo-dashboard/activities-events/activities-events.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './_guard/auth.guard';
import {AlertComponent} from './_directives/index';
import { LoginService, AlertService, PagerService } from './_service/index';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NgoDashboardComponent,
    HomeComponent,
    Modal,
    AlertComponent,
    OpportunitiesComponent,
    ProfileComponent,
    ContactComponent,
    ActivitiesEventsComponent
  ],
  imports: [
    BrowserModule,
    MatBadgeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatNativeDateModule

  ],
  entryComponents: [
    Modal
  ],
  providers: [AuthGuard,
    LoginService,
    AlertService,
    PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
