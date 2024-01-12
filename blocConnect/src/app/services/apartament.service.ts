import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, tap } from 'rxjs';


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
  getUserRequestByCNP(cnp: string): Observable<any[]>{
    return this.firestore.collection('apartamentRequests', ref => 
    ref.where('cnp', '==', cnp))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // conversie de la promisiune la observable
  deleteRequest(requestId: string): Observable<any> {
    return from(this.firestore.collection('apartamentRequests').doc(requestId).delete());
  }

  
  // getRequestsByCNP(cnp: string): Observable<any[]>{
  //   return this.firestore.collection("apartamentRequests", ref => ref.where('cnp', '==', cnp)).valueChanges();
  // }

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
