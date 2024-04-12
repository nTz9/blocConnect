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
}
  