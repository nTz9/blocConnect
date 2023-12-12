import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  dataLoaded = false;

  constructor(
    private formBuilder:FormBuilder,
    private authService: AuthService,
    private apartamentService: ApartamentService,
    private firestore: AngularFirestore
  ) { }

  apartaments: any[] = [];

  ngOnInit(): void {
      this.createRegisterForm();
  }
  createRegisterForm() { 
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      cnp : ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    })
  }

  // getApartamentsByCNP() {
  //   this.apartamentService.getAvailableApartamentsByCNP(this.registerForm.value.cnp).subscribe((apartaments: any) => {
  //     console.log(apartaments);
  //     this.apartaments = apartaments;
  //   })
  // }
  createAccountWithEmailAndPassword() {
    this.registerForm.value.isAdmin = false;
    if(this.registerForm.valid) {
      console.log(this.registerForm.value);
      if(this.registerForm.value.password == this.registerForm.value.confirmPassword) {
        const userData : any = Object.assign({},this.registerForm.value);
        this.authService.registerWithEmailAndPassword(userData.email, userData.password).then((userCredential :any) => {
          const currentUser = userCredential.user;
          if(currentUser) {
            const userId = currentUser.uid;
            this.firestore.collection("users").doc(userData.cnp).set({ 
              firstName: userData.firstName,
              lastName: userData.lastName,
              cnp: userData.cnp,
              email: userData.email,
              phone: userData.phone,
              password: userData.password,
              confirmPassword: userData.confirmPassword,
              isAdmin: userData.isAdmin,
            }).then((res:any) => {
              console.log(res);
              localStorage.setItem("token", "true");
              this.dataLoaded = true;

            }).catch((error:any) => {
              console.log(error);
            });
          }
          this.dataLoaded = true;
          console.log(userCredential);
        }).catch((error:any) => {
          console.log(error);
        })
      }
      else {
        console.error("Passwords do not match");
      }
    } 
    else {
      console.error("Please enter valid details");
    }
  }

}
