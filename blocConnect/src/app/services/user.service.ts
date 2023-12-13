import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = this.authService.getCurrentUser();
  userId : any = "";
  cnp : any = "";



  ngOnInit() {
  this.getLoggedUserId();
  }
  

  getCNPUser(uid: any) {
    this.firestore.collection('users').doc(uid).get().subscribe(user => {
      const userData = user.data() as {cnp: string};
      console.log(userData);
      if(user.exists) {
        this.cnp = userData?.cnp;
      }
      console.log(this.cnp);
    })
  }
  getLoggedUserId(){
    this.user$.subscribe(user => {
      const uid = user?.uid;
      this.userId = uid;
      this.getCNPUser(user?.uid);
      console.log(this.userId);
    })
  }
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) { }
}
