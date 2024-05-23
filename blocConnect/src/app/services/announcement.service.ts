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

  getAnnouncements(): Observable<any[]> {
    return this.firestore.collection('announcement').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  sendAnnouncement(announcement: any): Promise<any> {
    // Adaugă un nou document în colecția 'blocks' cu datele furnizate și ID-ul generat automat
    return this.firestore.collection('announcement').add(announcement);
  }

  updateAnnouncementVisibility(id: string, visible: boolean): Promise<void> {
    return this.firestore.collection('announcement').doc(id).update({ visible });
  }

  checkAndUpdateVisibility(): void {
    const now = new Date();
    this.getAnnouncements().subscribe(announcements => {
      announcements.forEach(announcement => {
        if (new Date(announcement.endDate) < now && announcement.visible) {
          this.updateAnnouncementVisibility(announcement.id, false).catch(error => {
            console.error('Error updating visibility: ', error);
          });
        } else if (new Date(announcement.endDate) >= now && !announcement.visible) {
          this.updateAnnouncementVisibility(announcement.id, true).catch(error => {
            console.error('Error updating visibility: ', error);
          });
        } 
      });
    });
  }

  updateAnnouncement(announcementID: string, updatedAnnouncement: any): Promise<void> {
    return this.firestore.collection('announcement').doc(announcementID).update(updatedAnnouncement);
  }

  deleteAnnouncement(announcementID: string) {
    return this.firestore.collection('announcement').doc(announcementID).delete();
  }

}
