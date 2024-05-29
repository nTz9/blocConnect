import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getMonthlyBillsForBlock(blockIds: string[]): Observable<any[]> {
   // console.log("blockIds received:", blockIds);
    return from(blockIds).pipe(
      mergeMap(blockId => {
   //     console.log("Querying for blockId:", blockId);
        return this.firestore.collection('monthlyBills', ref => ref.where('blockID', '==', blockId)).valueChanges();
      }),
      //mergeAll(), // Combinați toate răspunsurile într-un singur flux de date
      //toArray() // Grupați toate anunțurile într-un singur array
    );
  }

  addBill(billData: any): Promise<any> {
    return this.firestore.collection('monthlyBills').add(billData);
  }
}
