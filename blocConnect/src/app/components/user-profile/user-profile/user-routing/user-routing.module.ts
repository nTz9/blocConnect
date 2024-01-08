import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileSettingsComponent } from '../../user-profile-settings/user-profile-settings/user-profile-settings.component';
import { UserProfileComponent } from '../user-profile.component';
import { UserRequestComponent } from '../../user-request/user-request/user-request.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: 'user-profile',
    component: UserProfileComponent,
    children: [
      {
        path: 'user-profile-settings',
        component: UserProfileSettingsComponent
      },
      {
        path: 'user-request',
        component: UserRequestComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
