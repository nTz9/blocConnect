import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user-profile/user-data/user-data.service';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-user-profile-settings',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent implements OnInit {


  settingProfileForm: FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
  })

  userCNP : any = "";
  userEMAIL : any = "";
  userFIRSTNAME : any = "";
  userLASTNAME : any = "";
  userPHONE : any = "";

  createSettingProfileForm() { 
    this.settingProfileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required]    
    })
  }
  loadUserData() {
    this.userDataService.getUserData().subscribe(userData => {
      if(userData){
        this.settingProfileForm.patchValue({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone
        });
      }
   });
  }

  updateUserData() {
    this.userService.getLoggedUserUID().subscribe(userId => {
      if(userId){
        this.userDataService.updateUserData(userId, this.settingProfileForm.value).then(() => {
          console.log('User data updated successfully!');
        }, (error) => {
          console.log(error);
        });
      }
    });
  }

  constructor(
    private userService: UserService,
    private userDataService: UserDataService, 
    private formBuilder:FormBuilder
    ) {}

  ngOnInit(): void {
    this.createSettingProfileForm();
    this.loadUserData();    
  }
}
