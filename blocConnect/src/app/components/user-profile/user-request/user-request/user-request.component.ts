import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.css']
})
export class UserRequestComponent {
  user$ = this.authService.getCurrentUser();
  cnp : any = "";
  userCNP : any = "";
  apss : any = [];
  userUID : any = "";
  
  selectedApartament: any = "";
  apartaments: any = [];

  requestsApartaments: any = [];
  apartamentNumber: any = "";
////
// pentru a afisa toate apartamentele userului cu cnp-ul curent
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
      this.apartamentService.sendRequestForApartament(cnp,this.selectedApartament);
    });
  }
  getRequests() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      console.log('CNP primit: ', cnp);
      this.apartamentService.getRequestsByCNP(cnp).subscribe(requests => {
        console.log('Cereri primite: ', requests);
        if(requests){
          this.requestsApartaments = requests;
          console.log(this.requestsApartaments);
        }else{
          console.log("No requests");
        }    
      }, error => {
        console.log('Eroare: ', error);
      });
    });
  }
  

  ngOnInit() {
    this.getRequests();
    this.apartamentService.getAvailableApartaments().subscribe(data => {
      this.apartaments = data; // Aici ar trebui să fie un array
    });
    // this.getApps();
     
  }
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
    private apartamentService: ApartamentService,
  ) { }

}
