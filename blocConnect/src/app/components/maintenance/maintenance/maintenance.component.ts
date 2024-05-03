import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, forkJoin, map } from 'rxjs';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlockService } from 'src/app/services/block.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { UserService } from 'src/app/services/user.service';
import { WaterMeterService } from 'src/app/services/water-meter.service';

interface Block {
  id: string;
  // judetul: string;
  // oras: string;
  // strada: string;
  // administrator: string;
  // adresa: string;
   name: string;
}

interface Apartament {
  id: string;
  name:string;
}

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
  totalPayment = 0;
  dueDate: Date | undefined;

  blocks: string[] = [];
  selectedBlock: string | null = null;

  // getMonthBills() {
  //   this.userService.getLoggedUserId().subscribe(cnp => {
  //     this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apartament => {
  //       const blockIds = apartament.map((apartament: { blockID: any; }) => apartament.blockID);
  //       this.blocks = blockIds;
  //       console.log(this.blocks);
  //       this.maintenanceService.getMonthlyBillsForBlock(blockIds).subscribe(monthBills => {
  //        // this.bills = []; // Inițializăm vectorul de facturi pentru a evita dublarea
  //         monthBills.forEach(bill => {
  //           this.blockService.getBlockInfo(bill.blockID).subscribe((block: any) => {
  //             bill.block_name = block.name;
  //           });
  //           this.apartamentService.getApartamentInfo(bill.apartament_number).subscribe((apartament: any) => {
  //             bill.apartament_name = apartament.name;
  //           });
  //         //  this.bills.push(bill);
  //         });
  //         this.bills.push(...monthBills);
  //         // Filtrăm facturile doar după ce toate facturile au fost adăugate în vectorul bills
  //         this.filteredBills = this.bills;
  //         this.calculateTotalPayments();
  //         this.calculateDueDate();
  //         console.log(this.bills);
  //       });
  //     });
  //   });
  // }

  // getMonthBills() {
  //   this.userService.getLoggedUserId().subscribe(cnp => {
  //     this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apartament => {
  //       const blockIds = apartament.map((apartament: { blockID: any; }) => apartament.blockID);
  //       this.blocks = blockIds;
  //       console.log(this.blocks);
  //       this.maintenanceService.getMonthlyBillsForBlock(blockIds).subscribe(monthBills => {
  //         this.bills.push(...monthBills);
  //         this.filteredBills = this.bills;
  //         this.calculateTotalPayments();
  //         this.calculateDueDate();
  //         console.log(this.bills);
  //       });
  //     });
  //   });
  // }

  getMonthBills() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apartament => {
        const blockIds = apartament.map((apartament: { blockID: any; }) => apartament.blockID);
        this.blocks = blockIds;
        console.log(this.blocks);
        this.maintenanceService.getMonthlyBillsForBlock(blockIds).subscribe(monthBills => {
          // Iterăm prin fiecare factură din luna curentă
          monthBills.forEach(bill => {
            // Verificăm dacă factura curentă există deja în vectorul bills
            const existingBillIndex = this.bills.findIndex(existingBill => 
              existingBill.apartament_number === bill.apartament_number && 
              existingBill.blockID === bill.blockID && 
              existingBill.month === bill.month && 
              existingBill.year === bill.year
            );
  
            // Dacă factura nu există deja, o adăugăm în vectorul bills
            if (existingBillIndex === -1) {
              this.bills.push(bill);
            }
          });
          // După ce a fost parcursă lista cu facturi, se pot aplica filtrările și alte operațiuni
          this.filteredBills = this.bills;
          console.log(this.bills);
        });
      });
    });
  }
  
  
  

  calculateTotal(bill: Bills): number {
    const cleaningFee = parseFloat(bill.cleaning_fee);
    const waterPrice = parseFloat(bill.total_water_price);
    const otherExpenses = parseFloat(bill.other_expenses);
    return cleaningFee + waterPrice + otherExpenses;
  }

  calculateTotalPayments() {
    this.totalPayment = this.filteredBills.reduce((total, bill) => total + this.calculateTotal(bill), 0);
  }

  calculateDueDate() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.dueDate = nextMonth;
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

  // loadBillsForBlock(blockId: string) {
  //   this.selectedBlock = blockId;
  //   console.log("Selected block:", blockId);
  //   console.log("All bills:", this.bills);
  //   this.filteredBills = this.bills.filter(bill => bill.blockID === blockId);
  //   console.log("Filtered bills:", this.filteredBills);
  // }

  loadBillsForBlock(blockId: string) {
    this.selectedBlock = blockId;
    console.log("Selected block:", blockId);
    console.log("All bills:", this.bills);

    // Filtrăm facturile pentru blocul selectat
    this.filteredBills = this.bills.filter(bill => bill.blockID === blockId);

//    Iterăm prin facturile filtrate și setăm numele blocului și al apartamentului
    this.filteredBills.forEach(bill => {
      this.blockService.getBlockInfo(bill.blockID).subscribe((block: any) => {
        bill.block_name = block.name;
      });
      this.apartamentService.getApartamentInfo(bill.apartament_number).subscribe((apartament: any) => {
        bill.apartament_name = apartament.name;
      });
    });

    console.log("Filtered bills:", this.filteredBills);
    this.calculateTotalPayments();
    this.calculateDueDate();
  }

  clearSelectedBlock() {
    this.selectedBlock = null;
  }

}
