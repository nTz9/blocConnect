import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserProfileSettingsComponent } from '../../user-profile-settings/user-profile-settings/user-profile-settings.component';
import { UserRequestComponent } from '../../user-request/user-request/user-request.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserEstatePropertiesComponent } from '../../user-estate-properties/user-estate-properties/user-estate-properties.component';

@NgModule({
  declarations: [
    UserProfileSettingsComponent,
    UserRequestComponent,
    UserEstatePropertiesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [UserProfileSettingsComponent, UserRequestComponent, UserEstatePropertiesComponent]
})
export class UserModule { }

