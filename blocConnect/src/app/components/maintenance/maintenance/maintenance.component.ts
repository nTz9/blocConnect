import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlockService } from 'src/app/services/block.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { UserService } from 'src/app/services/user.service';
import { WaterMeterService } from 'src/app/services/water-meter.service';

interface Bills {
  apartament_number: string;
  blockID: string;
  cleaning_fee: string;
  judet: string;
  month: string;
  new_meter_index: string;
  old_meter_index: string;
  other_expenses: string;
  total_water_price: string;
  water_consumption: string;
  year: string;
  block_name: string;
  apartament_name: string;
}


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
    private apartamentService: ApartamentService,
    private waterMeterService: WaterMeterService,
    private blockService: BlockService,
    private maintenanceService: MaintenanceService
  ) { }

  ngOnInit(): void {
    this.getMonthBills();
  }

  bills: Bills[] = [];
  filteredBills: Bills[] = [];
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  years: string[] = ["2024", "2025", "2026", "2027", "2028"];
  selectedMonth = '';
  selectedYear='';
  searchText = '';


  getMonthBills() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apartament => {
        const blockIds = apartament.map((apartament: { blockID: any; }) => apartament.blockID);
        console.log(blockIds);
        this.maintenanceService.getMonthlyBillsForBlock(blockIds).subscribe(monthBills => {
          for (const bill of monthBills) {
            this.blockService.getBlockInfo(bill.blockID).subscribe((block: any) => { //la block:any aveam eroare la tipul ANY al blocului, de asta am pus aici asta
              bill.block_name = block.name; // Adăugați numele blocului în factură
             // this.bills.push(bill); // Adăugați factura la listă
            });
            this.apartamentService.getApartamentInfo(bill.apartament_number).subscribe((apartament: any) => {
              bill.apartament_name = apartament.name; // Adăugați numărul apartamentului în factură
              //this.bills.push(bill); // Adăugați factura la listă
            });
          }
          this.bills = monthBills;
          this.filteredBills = monthBills;
          console.log(this.bills);
        })
      })
    })
  }

  calculateTotal(bill: Bills): number {
    const cleaningFee = parseFloat(bill.cleaning_fee);
    const waterPrice = parseFloat(bill.total_water_price);
    const otherExpenses = parseFloat(bill.other_expenses);
    return cleaningFee + waterPrice + otherExpenses;
  }

  filterBills() {
    if (!this.searchText) {
      this.filteredBills = this.bills;
    } else {
      this.filteredBills = this.bills.filter(bill =>
        bill.apartament_name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  filterByMonth() {
    if (!this.selectedMonth) {
      this.filteredBills = this.bills;
    } else {
      this.filteredBills = this.bills.filter(bill =>
        bill.month === this.selectedMonth
      );
    }
  }

  filterByYear() {
    if (!this.selectedYear) {
      this.filteredBills = this.bills;
    } else {
      this.filteredBills = this.bills.filter(bill =>
        bill.year === this.selectedYear
      );
    }
  }
}


