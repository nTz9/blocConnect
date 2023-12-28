import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  ngOnInit() {
     this.userService.getLoggedUserId();
    //console.log(this.userService.cnp);
  }


  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
  ) { }
}
