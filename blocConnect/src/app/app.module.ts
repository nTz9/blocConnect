import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './components/auth/login/login/login.component';
import { RegisterComponent } from './components/auth/register/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { HomeComponent } from './components/home/home/home.component';
import { MenuComponent } from './components/menu/menu/menu.component';
import { BodyComponent } from './body/body/body.component';
import { MaintenanceComponent } from './components/maintenance/maintenance/maintenance.component';
import { UserProfileComponent } from './components/user-profile/user-profile/user-profile.component';
import { UserModule } from './components/user-profile/user-profile/user-routing/user.module';
import { UserEstatePropertiesComponent } from './components/user-profile/user-estate-properties/user-estate-properties/user-estate-properties.component';
import { WaterMeterComponent } from './components/water-meter/water-meter/water-meter.component';
import { SublevelMenuComponent } from './components/menu/sublevel-menu/sublevel-menu/sublevel-menu.component';
import { WaterMeterListComponent } from './components/water-meter/water-meter-list/water-meter-list/water-meter-list.component';
import { AnnouncementComponent } from './components/announcement/announcement/announcement.component';
import { ViewUsersComponent } from './components/admin-panel/view-users/view-users/view-users.component';
import { ViewBlocksComponent } from './components/admin-panel/view-blocks/view-blocks/view-blocks.component';
import { ViewRequestsComponent } from './components/admin-panel/view-apartaments/view-requests/view-requests/view-requests.component';
import { ViewApartamentsComponent } from './components/admin-panel/view-apartaments/view-apartaments/view-apartaments/view-apartaments.component';
import { ManageAnnouncementsComponent } from './components/admin-panel/manage-announcements/manage-announcements/manage-announcements.component';
import { ViewAnnouncementsComponent } from './components/admin-panel/manage-announcements/view-announcements/view-announcements/view-announcements.component';
import { ManageMaintenanceComponent } from './components/admin-panel/manage-maintenance/manage-maintenance/manage-maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MenuComponent,
    BodyComponent,
    MaintenanceComponent,
    UserProfileComponent,
    WaterMeterComponent,
    SublevelMenuComponent,
    WaterMeterListComponent,
    AnnouncementComponent,
    ViewUsersComponent,
    ViewBlocksComponent,
    ViewRequestsComponent,
    ViewApartamentsComponent,
    ManageAnnouncementsComponent,
    ViewAnnouncementsComponent,
    ManageMaintenanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    UserModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { 
  
}

