import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-estate-properties',
  templateUrl: './user-estate-properties.component.html',
  styleUrls: ['./user-estate-properties.component.css']
})
export class UserEstatePropertiesComponent {


  ngOnInit() {
    this.getApartament();
     
  }
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
    private apartamentService: ApartamentService,
  ) { }

  user$ = this.authService.getCurrentUser();
  cnp: any = "";
  apartaments: any = [];

  getApartament() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apps => {
        if (apps && apps.length > 0) {
          this.apartaments = apps;
          console.log(this.apartaments);
        } else {
          console.log("No apartaments found");
        }
      }, error => {
        console.log('Eroare: ', error);
      });
    });
  }


  cancelResidence(documentId: string) {
    this.userService.getLoggedUserId().subscribe(cnp => {      
      this.apartamentService.deleteProperty(documentId, cnp).then(() => {
        console.log('CNP removed or apartament deleted successfully');
        // O logică suplimentară pentru a actualiza interfața utilizator, dacă este necesar
        this.getApartament();
      }).catch(error => {
        console.error('Error removing CNP: ', error);
      });
    })
  }
}
