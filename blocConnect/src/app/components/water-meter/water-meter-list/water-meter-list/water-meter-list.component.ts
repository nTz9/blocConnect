import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { WaterMeterService } from 'src/app/services/water-meter.service';

@Component({
  selector: 'app-water-meter-list',
  templateUrl: './water-meter-list.component.html',
  styleUrls: ['./water-meter-list.component.css']
})
export class WaterMeterListComponent {


  ngOnInit() {
    this.getMeterReadings();
    
  }
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
    private apartamentService: ApartamentService,
    private waterMeterService: WaterMeterService
  ) { }


  user$ = this.authService.getCurrentUser();
  getMeterReadings() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.waterMeterService.getMeterReadingsByCNP(cnp).subscribe(data => {
        if(data){
          console.log(data);
        }
      });
    })
  }
}
