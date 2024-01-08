import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user-profile/user-data/user-data.service';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-profile-settings',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent implements OnInit {

  userCNP : any = "";
  userEMAIL : any = "";
  userFIRSTNAME : any = "";
  userLASTNAME : any = "";
  userPHONE : any = "";

  constructor(private userDataService: UserDataService) { 
  }

  ngOnInit(): void {
    this.userDataService.getUserData().subscribe(userData => {
      this.userCNP = userData.cnp;
      this.userEMAIL = userData.email;
      this.userFIRSTNAME = userData.firstName;
      this.userLASTNAME = userData.lastName;
      this.userPHONE = userData.phone;
    });
  }

}
