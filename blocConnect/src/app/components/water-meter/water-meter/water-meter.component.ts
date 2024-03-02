import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDataService } from '../../user-profile/user-profile/user-data/user-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApartamentService } from 'src/app/services/apartament.service';

@Component({
  selector: 'app-water-meter',
  templateUrl: './water-meter.component.html',
  styleUrls: ['./water-meter.component.css']
})
export class WaterMeterComponent implements OnInit{

  apartaments: any = [];
  userCNP: any = "";


  waterMeterForm: FormGroup = new FormGroup ({
    userCNP: new FormControl('', [Validators.required]),
    apartamentId: new FormControl('', [Validators.required]),
 //   imageURL: new FormControl('', [Validators.required]),
    readingDate: new FormControl('', [Validators.required]),
    readingvalue: new FormControl('', [Validators.required]),
    comments: new FormControl('', [Validators.required]),
  })

  createWaterMeterForm() { 
    this.waterMeterForm = this.formBuilder.group({
      userCNP: [{value: '', disabled: true}],
      apartamentId: ['', [Validators.required]],
 //     imageURL: ['', [Validators.required]],
      readingDate: ['', [Validators.required]],
      readingvalue: ['', [Validators.required]],
      comments: ['', [Validators.required]],
    })
  }


  sendRequest() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.userCNP = cnp;
      // Actualizați formularul cu CNP-ul primit
      this.waterMeterForm.patchValue({
        userCNP: this.userCNP
      });
      this.loadApartament(cnp);
    });
  }

  loadApartament(cnp: string): void {
    this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apps => {
      if (apps && apps.length > 0) {
        this.apartaments = apps;
      } else {
        console.log("No apartaments found");
      }
    }, error => {
      console.log('Eroare: ', error);
    });
  }

  getApartament() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apps => {
        if (apps && apps.length > 0) {
          this.apartaments = apps;
        } else {
          console.log("No apartaments found");
        }
      }, error => {
        console.log('Eroare: ', error);
      });
    });
  }
  

  onSubmit(): void {
    if (this.waterMeterForm.valid) {
      const formValue = {...this.waterMeterForm.value, userCNP: this.userCNP}; // Includeți CNP-ul în obiectul trimis
      console.log(formValue);
      // Aici ați trimite formValue către backend sau Firestore
      alert("Citirea apometrului a fost trimisă cu succes.");
    } else {
      alert("Vă rugăm să completați toate câmpurile obligatorii.");
    }
  }

  constructor(
    private userService: UserService,
    private userDataService: UserDataService, 
    private formBuilder:FormBuilder,
    private apartamentService: ApartamentService,
    ) {}

  ngOnInit(): void {
    this.createWaterMeterForm(); // Inițializați formularul
    this.sendRequest();
  }


}
