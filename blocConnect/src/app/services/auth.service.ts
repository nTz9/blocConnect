import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private authFire: AngularFireAuth,
    private router: Router,

    ) { }

  signWithEmailAndPassword(user: {email: string, password: string}) {
    return this.authFire.signInWithEmailAndPassword(user.email, user.password);
  }

  // isAuthenticated() {
  //   if(this.localStorage.getItem("token") == "true") {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }


}