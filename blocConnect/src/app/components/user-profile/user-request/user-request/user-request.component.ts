import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';


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
  selectedBlockId: string = "";
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
        // console.log(this.apss);
      });
    });
  }
  sendRequest() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      const selectedApartment = this.apartaments.find((ap:any )=> ap.id === this.selectedApartament);
      if (selectedApartment) {
        this.selectedBlockId = selectedApartment.blockID;
        // console.log('Selected block ID: ', this.selectedBlockId);
        this.requestsService.sendRequestForApartament(cnp, this.selectedApartament, this.selectedBlockId);
      }
    });
  }
  getRequests() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.requestsService.getUserRequestByCNP(cnp).subscribe(requests => {
        if (requests && requests.length > 0) {
          this.requestsApartaments = requests; // Salvăm cererile în starea componentei
          this.totalPages = Math.ceil(requests.length / this.requestsPerPage);
          this.changePage(1); // Inițializăm afișarea paginată a cererilor
          
          // Iterăm prin fiecare request pentru a prelua detaliile apartamentului
          requests.forEach((request, index) => {
            if (request.apartamentId) {
              this.apartamentService.getApartamentInfo(request.apartamentId).subscribe(apartamentDetails => {
                // Actualizăm request-ul cu detaliile apartamentului
                this.requestsApartaments[index] = {
                  ...this.requestsApartaments[index],
                  apartamentInfo: apartamentDetails
                };
  
                // console.log('Apartament info: ', apartamentDetails);
                // Dacă este ultimul request, actualizăm afișarea
                if (index === requests.length - 1) {
                  this.changePage(this.currentPage); // Re-afișăm pagina curentă pentru a reflecta noile date
                }
              });
            }
          });
        } else {
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
    this.requestsService.deleteRequest(requestId).subscribe(() => {
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
    private requestsService: RequestsService
  ) { }

}
