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
    return this.firestore.collection("apartaments", ref => ref.where('owners', 'array-contains', cnp)).snapshotChanges()
    .pipe(
      map(actions => actions.map(a => ({
        payload: a.payload,
        id: a.payload.doc.id,
        ...a.payload.doc.data() as any
      }))
    )
    );
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

  async deleteProperty(documentId: string, cnpToRemove: string): Promise<void> {
    const apartamentRef = this.firestore.collection('apartaments').doc(documentId);
  
    try {
      const docSnapshot = await apartamentRef.get().toPromise();
  
      // Verifică dacă docSnapshot există
      if (!docSnapshot || !docSnapshot.exists) {
        throw new Error("Document does not exist or could not be fetched!");
      }
  
      const apartament = docSnapshot.data() as ApartamentData;
      const updatedOwners = apartament.owners.filter(cnp => cnp !== cnpToRemove);
  
      if (updatedOwners.length === 0) {
        // Dacă lista de proprietari este goală, șterge documentul
        await apartamentRef.delete();
        console.log("Apartament deleted successfully because it has no owners.");
      } else {
        // Actualizează documentul cu noua listă de proprietari
        await apartamentRef.update({ owners: updatedOwners });
        console.log("CNP removed successfully.");
      }
    } catch (error) {
      console.error("Error removing CNP from apartament:", error);
    }
  }
  

  // conversie de la promisiune la observable
  deleteRequest(requestId: string): Observable<any> {
    return from(this.firestore.collection('apartamentRequests').doc(requestId).delete());
  }

  
  // getRequestsByCNP(cnp: string): Observable<any[]>{
  //   return this.firestore.collection("apartamentRequests", ref => ref.where('cnp', '==', cnp)).valueChanges();
  // }

  // semn de intrebare
  getApartamentInfo(apartamentId: any): Observable<any[]>{
    return this.firestore.doc(`apartaments/${apartamentId}`).valueChanges() as Observable<any[]>;
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
interface ApartamentData {
  id: string;
  owners: string[];
}
