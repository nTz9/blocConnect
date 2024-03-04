import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, takeLast } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaterMeterService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
  }

  addMeterReading(meterReadingData: any) {
    return this.firestore.collection('meterReadings').add(meterReadingData);
  }

  uploadImageAndGetURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `meter-images/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            resolve(url);
          }, reject);
        })
      ).subscribe();
    });
  }

  addWaterMeterDataa(data: any, imageURL?: string) {
    const filestoreData = {...data, imageURL};
    return this.firestore.collection('meterReading').add(filestoreData);
  }

}
