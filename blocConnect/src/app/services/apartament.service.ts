import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApartamentService {

  constructor(private firestore: AngularFirestore) { }

  getAvailableApartamentsByCNP(cnp: string): Observable<any[]>{
    return this.firestore.collection("apartaments", ref => ref.where('owners', 'array-contains', cnp)).valueChanges();
  }

}
