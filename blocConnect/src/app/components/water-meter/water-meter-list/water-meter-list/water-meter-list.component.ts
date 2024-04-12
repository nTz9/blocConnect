import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlockService } from 'src/app/services/block.service';
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

  selectedApartment: number | null = null;
  dropdownOpen: boolean = false;

  currentPage = 1;
  itemsPerPage = 2;

  ngOnInit() {
    this.getMeterReadingsByApartament();
    
  }
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
    private apartamentService: ApartamentService,
    private waterMeterService: WaterMeterService,
    private blockService: BlockService
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

  getMeterReadingsByApartament() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apartaments => {
        if(apartaments){
          this.apartaments = apartaments;
          console.log(apartaments);
          const apartamentIds = apartaments.map(apartament => apartament.id);
          this.waterMeterService.getMeterReadingsByApartamentId(apartamentIds).subscribe(data => {
            this.meterReadings = data;
            console.log(data);
            this.apartaments.forEach((apartament: { meterReadings: any; id: any;blockID: string; blockInfo?: any }) => {
              apartament.meterReadings = this.meterReadings.filter((meterReading: { apartamentID: any; }) => meterReading.apartamentID === apartament.id);
              this.blockService.getBlockInfo(apartament.blockID).subscribe(blockInfo => {
                apartament.blockInfo = blockInfo;
                console.log(apartament.blockInfo);
              });
            });
          })
        }
      })
    })
  }

  toggleDropdown(apartmentId: number): void {
    if (this.selectedApartment === apartmentId) {
      this.selectedApartment = null;
    } else {
      this.selectedApartment = apartmentId;
    }
  }
  getPageCount(): number {
    return Math.ceil(this.meterReadings.length / this.itemsPerPage);
  }

  getPaginatedData(apartmentId: number): any[] {
    const apartment = this.apartaments.find((apartment: { id: number; }) => apartment.id === apartmentId);
    if (!apartment) return [];
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return apartment.meterReadings.slice(startIndex, endIndex);
  }
  

  goToPage(pageNumber: number): void {
    if(pageNumber>= 1 && pageNumber <= this.getPageCount()){
      this.currentPage = pageNumber;
    }
  }
  
}
