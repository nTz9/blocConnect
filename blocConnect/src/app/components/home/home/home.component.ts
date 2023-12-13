import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



  user$ = this.authService.getAuthUserData();
  userId : any = "";

  ngOnInit() {
  this.getLoggedUserId();
  }
  cnp : any = "";

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
