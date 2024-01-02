import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = this.authService.getCurrentUser();
  userId : any = "";


  cnp : any = "";
  role: any = "";
  email : any = "";


  ngOnInit() {
  this.getLoggedUserId();
  }
  
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) { }

  getCNPUser(uid: any) {
    this.firestore.collection('users').doc(uid).get().subscribe(user => {
      const userData = user.data() as {cnp: string};
      console.log(userData);
      if(user.exists) {
        this.cnp = userData?.cnp;
      }
      return this.cnp;
    })
  }

  getUserDetails(uid: any): Observable<string>{
    return new Observable<string>(observer => {
      this.firestore.collection('users').doc(uid).get().subscribe(user => {
        const userData = user.data() as { cnp: string, role: string, email: string };
        console.log(userData);
        if (user.exists) {
          this.cnp = userData?.cnp;
          this.role = userData?.role;
          this.email = userData?.email;
          observer.next(this.cnp); // Emite valoarea CNP
          observer.complete();
        } else {
          observer.error('Utilizatorul nu a fost găsit');
        }
      });
    });
  }

  getLoggedUserId() : Observable<string>{
    return this.user$.pipe(
      tap(user => {
        const uid = user?.uid;
        this.userId = uid;
        console.log(this.userId); // Afișează valoarea UID
      }),
      switchMap(user => this.getUserDetails(user?.uid)),
      tap(cnp => {
        console.log(cnp); // Afișează valoarea CNP
      })
    );
  }

  verifyIsAdmin(uid: any) {
    
  }
}
