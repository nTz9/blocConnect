import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class ApartamentService {

  constructor(private firestore: AngularFirestore) { }

  getAvailableApartamentsByCNP(cnp: string) {
    return this.firestore.collection("apartaments", ref => ref.where('owner', '==', cnp)).valueChanges();
  }

}
