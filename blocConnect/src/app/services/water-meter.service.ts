import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class WaterMeterService {

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  addMeterReading(meterReadingData: any) {
    return this.firestore.collection('meterReadings').add(meterReadingData);
  }
}
