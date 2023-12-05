import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataLoaded = false;

  loginForm: FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, private router: Router, private authFire: AngularFireAuth){}

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() { }

  loginWithEmailAndPassword() {
    let isSessionsActive = localStorage.getItem("token")
    console.error(isSessionsActive);
    if(isSessionsActive == "0" || isSessionsActive == undefined || !(isSessionsActive=="1")) {
        if(this.loginForm.valid) {
          console.log(this.loginForm.value);
        const userData : any = Object.assign({},this.loginForm.value);
        this.authFire.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then((res :any) => {
          localStorage.setItem("token", "true");
          this.dataLoaded = true;
          this.router.navigateByUrl('home');
        }).catch((error:any) => {
          console.log(error);
          this.router.navigateByUrl('register');
        })
      } 
      else {
        console.error("Please enter valid details");
      }
    } 
    // else {
    //   console.error("Session already active");
    // }    
  }
}

