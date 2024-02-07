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

  apartamentInfo: any = [];

  requestsApartaments: any = [];
  apartamentNumber: any = "";


  currentPage: number = 1;
  requestsPerPage: number = 1;
  displayRequests: any = [];
  totalPages: number = 0;
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
      this.apartamentService.getUserRequestByCNP(cnp).subscribe(requests => {
        if(requests){

          const apartamentIds = requests.map((request: any) => request.apartamentId);
          console.log(apartamentIds);

          this.apartamentService.getApartamentInfo(apartamentIds[0]).subscribe(apartaments => {
            this.apartamentInfo = apartaments;
            console.log(this.apartamentInfo);
          });

          this.requestsApartaments = requests;
          this.totalPages = Math.ceil(this.requestsApartaments.length / this.requestsPerPage);
          this.changePage(1);
     //     console.log(this.requestsApartaments);
        }else{
          console.log("No requests");
        }    
      }, error => {
        console.log('Eroare: ', error);
      });
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.requestsPerPage;
    const end = start + this.requestsPerPage;
    this.displayRequests = this.requestsApartaments.slice(start, end);
  }

  nextPage() {
    this.changePage(this.currentPage + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }


  cancelRequest(requestId: string) {
    this.apartamentService.deleteRequest(requestId).subscribe(() => {
      console.log('Request deleted');
      this.getRequests();
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
