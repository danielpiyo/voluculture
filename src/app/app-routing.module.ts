import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgoDashboardComponent } from './ngo-dashboard/ngo-dashboard.component';
import { HomeComponent } from './ngo-dashboard/home/home.component';
import { OpportunitiesComponent } from './ngo-dashboard/opportunities/opportunities.component';
import { ActivitiesEventsComponent } from './ngo-dashboard/activities-events/activities-events.component';
import { ProfileComponent } from './ngo-dashboard/profile/profile.component';
import { AuthGuard } from './_guard/auth.guard';


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'signup', component:RegisterComponent},
  {path:'dashboard', component:NgoDashboardComponent, canActivate:[AuthGuard], children:[
                  {path:'', component:HomeComponent},
                  {path:'opportunities', component:OpportunitiesComponent},
                  {path:'events', component:ActivitiesEventsComponent},
                  {path:'profile', component:ProfileComponent}
  ]},  
  // redirecting all other routes to login
  {path:'*', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
