import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
    ) { };
    
  user$ = this.authService.getCurrentUser();
  userCNP : any = "";
  userEMAIL : any = "";
  userFIRSTNAME : any = "";
  userLASTNAME : any = "";
  userPHONE : any = "";
  userROLE : any = "";
  userAPARTAMENTS : any[] = [];

  getUserDetails(uid: any): Observable<string>{
    return new Observable<string>(observer => {
      this.firestore.collection('users').doc(uid).get().subscribe(user => {
        const userData = user.data() as { cnp: string, role: string, email: string,firstName: string, lastName: string, phone: string, apartaments: any[]};
        console.log(userData);
        if (user.exists) {
          this.userCNP = userData?.cnp;
          this.userEMAIL = userData?.email;
          this.userFIRSTNAME = userData?.firstName;
          this.userLASTNAME = userData?.lastName;
          this.userPHONE = userData?.phone;
          this.userROLE = userData?.role;
          this.userAPARTAMENTS = userData?.apartaments;
          observer.next(); // Emite valoarea CNP
          observer.complete();
        } else {
          observer.error('Utilizatorul nu a fost găsit');
        }
      });
    });
  }

  loadUserDetails() {
    this.userService.getLoggedUserUID().subscribe(uid => {
      if (uid) {
        this.getUserDetails(uid).subscribe( 
          userData => {
            console.log('Detalii Utilizator: ', userData);
          },
          error => {
            console.error('Eroare la obținerea detaliilor utilizatorului: ', error);
          }
        );
      } else {
        console.log('Niciun utilizator logat.');
      }
    });
  }
  ngOnInit() {
    this.loadUserDetails();
  }

}
