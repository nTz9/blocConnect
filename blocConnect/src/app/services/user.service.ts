import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, switchMap, tap } from 'rxjs';

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

  getUserCNP(uid: any): Observable<string>{
    return new Observable<string>(observer => {
      this.firestore.collection('users').doc(uid).get().subscribe(user => {
        const userData = user.data() as { cnp: string};
   //     console.log(userData);
        if (user.exists) {
          this.cnp = userData?.cnp;
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
      switchMap(user => this.getUserCNP(user?.uid)),
      tap(cnp => {
        console.log(cnp); // Afișează valoarea CNP
      }),
    );
  }
  getLoggedUserUID(): Observable<string>{
    return this.user$.pipe(
      map(user => user ? user.uid : ''),
    );
  }
  getRole(uid: any): Observable<string>{
    return new Observable<string>(observer => {
      this.firestore.collection('users').doc(uid).get().subscribe(user => {
        const userData = user.data() as { role: string};
        if (user.exists) {
          this.role = userData?.role;
          observer.next(this.role); // Emite valoarea rolului
          observer.complete();
        } else {
          observer.error('Utilizatorul nu a fost găsit');
        }
      });
    });
  }
  getLoggedUserRole() : Observable<string>{
    return this.user$.pipe(
      tap(user => {
        const uid = user?.uid;
        this.userId = uid;
      }),
      switchMap(user => this.getRole(user?.uid)),
      tap(role => {
        console.log(role); // Afișează valoarea CNP
      }),
    );
  }
  
}
