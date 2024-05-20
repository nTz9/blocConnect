import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private firestore: AngularFirestore) { }

  getRequests(): Observable<any[]> {
    return this.firestore.collection('apartamentRequests').snapshotChanges();
  }

  updateRequestStatus(requestId: string, status: string): Promise<void> {
    return this.firestore.collection('apartamentRequests').doc(requestId).update({ status });
  }

  addOwnerToApartment(apartamentId: string, ownerCNP: string): Promise<void> {
    return this.firestore.collection('apartaments').doc(apartamentId).update({
      owners: firebase.firestore.FieldValue.arrayUnion(ownerCNP)
    });
  }

  deleteRequest(requestId: string): Observable<any> {
    return from(this.firestore.collection('apartamentRequests').doc(requestId).delete());
  }

  getUserRequestByCNP(cnp: string): Observable<any[]>{
    return this.firestore.collection('apartamentRequests', ref => 
    ref.where('cnp', '==', cnp))
    .snapshotChanges()
    .pipe(
      map((actions: any[]) => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  sendRequestForApartament(cnp: string, apartamentId: string, blockID: string): void{
    if(apartamentId) {
      const request = {
        cnp: cnp,
        apartamentId: apartamentId,
        blockID: blockID,
        status: 'pending'
      };
      console.log(request);
      this.firestore.collection('apartamentRequests').add(request);  
    }
  }
}
