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
  roleAdmin : any = false;
  email : any = "";


  ngOnInit() {
  this.getLoggedUserId();
  }
  
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) { }

  getCNPUser(uid: any) {
    this.firestore.collection('users').doc(uid).get().subscribe(user => {
      const userData = user.data() as {cnp: string};
      console.log(userData);
      if(user.exists) {
        this.cnp = userData?.cnp;
      }
      return this.cnp;
    })
  }

  getUserDetails(uid: any) {
    this.firestore.collection('users').doc(uid).get().subscribe(user => {
      const userData = user.data() as {cnp: string, isAdmin: boolean, email: string, };
      console.log(userData);
      if(user.exists) {
        this.cnp = userData?.cnp;
        this.roleAdmin = userData?.isAdmin;
        this.email = userData?.email;
      }
      console.log(this.cnp);
    })
  }

  getLoggedUserId(){
    this.user$.subscribe(user => {
      const uid = user?.uid;
      this.userId = uid;
      this.getUserDetails(user?.uid);
      console.log(this.userId);
    })
  }

  verifyIsAdmin(uid: any) {

  }
}
