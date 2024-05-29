import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/auth/login/login/login.component';
import { RegisterComponent } from './components/auth/register/register/register.component';
import { HomeComponent } from './components/home/home/home.component';
import { MaintenanceComponent } from './components/maintenance/maintenance/maintenance.component';
import { UserProfileComponent } from './components/user-profile/user-profile/user-profile.component';
import { WaterMeterComponent } from './components/water-meter/water-meter/water-meter.component';
import { WaterMeterListComponent } from './components/water-meter/water-meter-list/water-meter-list/water-meter-list.component';
import { AnnouncementComponent } from './components/announcement/announcement/announcement.component';
import { ViewUsersComponent } from './components/admin-panel/view-users/view-users/view-users.component';
import { ViewBlocksComponent } from './components/admin-panel/view-blocks/view-blocks/view-blocks.component';
import { ViewRequestsComponent } from './components/admin-panel/view-apartaments/view-requests/view-requests/view-requests.component';
import { ViewApartamentsComponent } from './components/admin-panel/view-apartaments/view-apartaments/view-apartaments/view-apartaments.component';
import { ManageAnnouncementsComponent } from './components/admin-panel/manage-announcements/manage-announcements/manage-announcements.component';
import { ViewAnnouncementsComponent } from './components/admin-panel/manage-announcements/view-announcements/view-announcements/view-announcements.component';
import { ManageMaintenanceComponent } from './components/admin-panel/manage-maintenance/manage-maintenance/manage-maintenance.component';


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
  },
  {
    path: "announcement",
    component: AnnouncementComponent
  },
  {
    path: "view-users",
    component: ViewUsersComponent
  },
  {
    path: "view-blocks",
    component: ViewBlocksComponent
  },
  {
    path: "view-requests",
    component: ViewRequestsComponent
  },
  {
    path: "view-apartaments",
    component: ViewApartamentsComponent
  },
  {
    path: "manage-announcements",
    component: ManageAnnouncementsComponent
  },
  {
    path: "view-announcements",
    component: ViewAnnouncementsComponent
  },
  {
    path: "manage-maintenance",
    component: ManageMaintenanceComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
