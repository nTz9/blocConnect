import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  getBlockInfo(blockID: any): Observable<any[]>{
    return this.firestore.doc(`block/${blockID}`).valueChanges() as Observable<any[]>;
  }

  // Admin Panel

  getBlocks(): Observable<any[]> {
    return this.firestore.collection('block').snapshotChanges();
  }

  addBlock(blockData: any): Promise<any> {
    // Adaugă un nou document în colecția 'blocks' cu datele furnizate și ID-ul generat automat
    return this.firestore.collection('block').add(blockData);
  }

  updateBlock(blockId: string, updatedBlock: any): Promise<void> {
    return this.firestore.collection('block').doc(blockId).update(updatedBlock);
  }

  deleteBlock(blockID: string) {
    return this.firestore.collection('block').doc(blockID).delete();
  }

}
  