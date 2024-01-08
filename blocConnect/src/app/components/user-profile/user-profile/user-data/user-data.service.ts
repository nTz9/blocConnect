import { Injectable } from '@angular/core';
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

  constructor() { }
}
