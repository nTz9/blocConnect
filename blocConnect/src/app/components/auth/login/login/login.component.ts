import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';


  loginForm: FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })


  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() { }

  login() {
    console.log(this.loginForm.value);
  }

}

