import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserProfileSettingsComponent } from '../../user-profile-settings/user-profile-settings/user-profile-settings.component';
import { UserRequestComponent } from '../../user-request/user-request/user-request.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    UserProfileSettingsComponent,
    UserRequestComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
  ],
  exports: [UserProfileSettingsComponent, UserRequestComponent]
})
export class UserModule { }

