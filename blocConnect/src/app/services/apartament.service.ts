import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApartamentService {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  apartaments: any[] = [];

  getAvailableApartamentsByCNP(cnp: string): Observable<any[]>{
    return this.firestore.collection("apartaments", ref => ref.where('owners', 'array-contains', cnp)).valueChanges();
  }

  
  getRequestsByCNP(cnp: string): Observable<any[]>{
    return this.firestore.collection("apartamentRequests", ref => ref.where('cnp', '==', cnp)).valueChanges().pipe(
      tap(requests => {
        console.log('Cereri: ', requests);
      })
    );
  }

  // semn de intrebare
  getApartamentInfo(apartamentId: string): Observable<any[]>{
    return this.firestore.collection("apartaments", ref => ref.where('apartamentId', 'array-contains', apartamentId)).valueChanges();
  }
////
sendRequestForApartament(cnp: string, apartamentId: string): void{
  if(apartamentId) {
    const request = {
      cnp: cnp,
      apartamentId: apartamentId,
      status: 'pending'
    };
    console.log(request);
    this.firestore.collection('apartamentRequests').add(request);  
  }
}

  getAvailableApartaments(): Observable<any[]> {
    return this.firestore.collection('apartaments').valueChanges({ idField: 'id'});
  }

}
