import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData = new BehaviorSubject<any>({});

  setUserData(data: any) {
    this.userData.next(data);
  }

  getUserData() {
    return this.userData.asObservable();
  }

  updateUserData(userId: string, userData: any): Promise<void> {
    return this.firestore.collection('users').doc(userId).update(userData);
  }

  constructor(
    private firestore: AngularFirestore
  ) { }
}
