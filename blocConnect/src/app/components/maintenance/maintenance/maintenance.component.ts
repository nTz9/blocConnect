import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent {

  user$ = this.authService.getCurrentUser();
  cnp : any = "";
  userCNP : any = "";
  apss : any = [];
  
  selectedApartament: string = "";
  apartaments: any = [];
////

  getApps() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.userCNP = cnp;
     // console.log(this.userCNP);
      this.apartamentService.getAvailableApartamentsByCNP(this.userCNP).subscribe(apps => {
        this.apss = apps;
        console.log(this.apss);
      });
    });
  }
  sendRequest() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.userCNP = cnp;
      this.apartamentService.sendRequestForApartament(this.userCNP,this.selectedApartament);
    });
  }
  

  ngOnInit() {
    this.apartamentService.getAvailableApartaments().subscribe(data => {
      this.apartaments = data; // Aici ar trebui să fie un array
    });
     this.getApps();
     this.sendRequest();
     
  }
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
    private apartamentService: ApartamentService,
  ) { }
}


