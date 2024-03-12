import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/auth/login/login/login.component';
import { RegisterComponent } from './components/auth/register/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { MaintenanceComponent } from './components/maintenance/maintenance/maintenance.component';
import { UserProfileComponent } from './components/user-profile/user-profile/user-profile.component';
import { WaterMeterComponent } from './components/water-meter/water-meter/water-meter.component';
import { WaterMeterListComponent } from './components/water-meter/water-meter-list/water-meter-list/water-meter-list.component';


const routes: Routes = [
{
  path: 'login',
  component: LoginComponent
},
{
  path: "register",
  component: RegisterComponent
},
{
  path: "home",
  component: HomeComponent
},
{
  path: "maintenance",
  component: MaintenanceComponent
},
{
  path: "user-profile",
  component: UserProfileComponent
},
{
  path: "water-meter",
  component: WaterMeterComponent
},
{
  path: "water-meter-list",
  component: WaterMeterListComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
