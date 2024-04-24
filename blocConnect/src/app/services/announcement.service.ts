import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, mergeAll, mergeMap, switchMap, toArray } from 'rxjs';


interface Category { //pentru unknow de a de la functia mea
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAnnouncementsForBlocks(blockIds: string[]): Observable<any[]> {
    console.log("blockIds received:", blockIds);
    return from(blockIds).pipe(
      mergeMap(blockId => {
        console.log("Querying for blockId:", blockId);
        return this.firestore.collection('announcement', ref => ref.where('blocId', '==', blockId)).valueChanges();
      }),
      //mergeAll(), // Combinați toate răspunsurile într-un singur flux de date
      //toArray() // Grupați toate anunțurile într-un singur array
    );
  }

  getCategories(): Observable<string[]> {
    return this.firestore.collection<Category>('announcement').valueChanges().pipe(
      map(announcements => {
        const categories = announcements.map(a => a.category);
        return Array.from(new Set(categories));
      })
    );
  }

}
