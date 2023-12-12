import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  firstName: string = "";
  lastName: string = "";
  cnp : string = "";
  email: string = "";
  phone: string = "";
  password: string = "";
  confirmPassword: string = "";
  isLoggedIn: boolean = false;

  constructor(
    private authFire: AngularFireAuth,
    private router: Router,

    ) { }

  
  signWithEmailAndPassword(user: {email: string, password: string}) {
    return this.authFire.signInWithEmailAndPassword(user.email, user.password);
  }

  registerWithEmailAndPassword(email: string, password: string) {
    return this.authFire.createUserWithEmailAndPassword(email, password);
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