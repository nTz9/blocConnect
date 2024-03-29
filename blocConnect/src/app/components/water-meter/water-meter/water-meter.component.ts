import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDataService } from '../../user-profile/user-profile/user-data/user-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApartamentService } from 'src/app/services/apartament.service';
import { WaterMeterService } from 'src/app/services/water-meter.service';
import * as firebase from 'firebase/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc } from 'firebase/firestore';

@Component({
  selector: 'app-water-meter',
  templateUrl: './water-meter.component.html',
  styleUrls: ['./water-meter.component.css']
})
export class WaterMeterComponent implements OnInit{

  apartaments: any = [];
  userCNP: any = "";

  selectedFile: File | null = null;

  waterMeterForm: FormGroup = new FormGroup ({
    userCNP: new FormControl('', [Validators.required]),
    apartamentId: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),
    readingDate: new FormControl('', [Validators.required]),
    readingvalue: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    notes: new FormControl('', [Validators.required]),
  })

  createWaterMeterForm() { 
    this.waterMeterForm = this.formBuilder.group({
      userCNP: [{value: '', disabled: true}],
      apartamentID: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
      readingDate: ['', [Validators.required]],
      readingvalue: ['', [Validators.required]],
      type: ['', [Validators.required]],
      notes: ['', [Validators.required]],
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

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.waterMeterForm.valid && this.selectedFile) {
      this.waterMeterService.uploadImageAndGetURL(this.selectedFile).then(imageURL => {
        const waterMeterData = this.waterMeterForm.getRawValue();
  
        const waterMeter = {
          userCNP: waterMeterData.userCNP,
          apartamentID: waterMeterData.apartamentID,
          readingDate: waterMeterData.readingDate,
          readingvalue: waterMeterData.readingvalue,
          notes: waterMeterData.notes,
          imageURL: imageURL, // Foloseste URL-ul imaginii obtinut dupa incarcare
          type: waterMeterData.type,
          status: 'pending'
        };
  
        this.waterMeterService.addMeterReading(waterMeter).then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        }).catch(error => {
          console.error("Error adding document: ", error);
        });
  
      }).catch(error => {
        console.error("Error uploading image: ", error);
      });
    }
  }

  constructor(
    private userService: UserService,
    private userDataService: UserDataService, 
    private formBuilder:FormBuilder,
    private apartamentService: ApartamentService,
    private waterMeterService: WaterMeterService,
    ) {}

  ngOnInit(): void {
    this.createWaterMeterForm(); // Inițializați formularul
    this.sendRequest();
  }


}
