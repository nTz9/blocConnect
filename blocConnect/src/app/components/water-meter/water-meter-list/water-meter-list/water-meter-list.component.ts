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

  meterReadings: any = [];
  apartaments: any = [];

  currentPage = 1;
  itemsPerPage = 2;

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
          this.meterReadings = data.sort((a,b) => new Date(a.readingDate).getTime() - new Date(b.readingDate).getTime());
        }
      });
    })
  }

  // getMeterReadingsByApartament() {
  //   this.userService.getLoggedUserId().subscribe(cnp => {
  //     this.waterMeterService.getMeterReadingsByCNP(cnp).subscribe(data => {
  //       if(data){
  //         const apartamentNumber = [...new Set(data.map(reading => reading.apartamentNumber))];
  //         this.apartaments = apartamentNumber.map(apartament => ({
  //           apartamentNumber: apartament,
  //           meterReadings: data.filter(reading => reading.apartamentNumber === apartament)
  //         }));
  //       }
  //     });
  //   })
  // }

  getPageCount(): number {
    return Math.ceil(this.meterReadings.length / this.itemsPerPage);
  }
  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.meterReadings.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number): void {
    if(pageNumber>= 1 && pageNumber <= this.getPageCount()){
      this.currentPage = pageNumber;
    }
  }
  
}
