import { Component, OnInit } from '@angular/core';
import { ApartamentService } from 'src/app/services/apartament.service';
import { BlockService } from 'src/app/services/block.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';

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

}

@Component({
  selector: 'app-manage-maintenance',
  templateUrl: './manage-maintenance.component.html',
  styleUrls: ['./manage-maintenance.component.css']
})
export class ManageMaintenanceComponent implements OnInit{

  constructor(
    private blockService: BlockService,
    private apartamentService: ApartamentService,
    private maintenanceService: MaintenanceService
  ){}


  blocks: any[] = [];
  selectedBlock: any = null;

  bills: Bills = {
    apartament_number: '',
    blockID: '',
    cleaning_fee: '',
    judet: '',
    month: '',
    new_meter_index: '',
    old_meter_index: '',
    other_expenses: '',
    total_water_price: '',
    water_consumption: '',
    year: '',
  };

  showActionsMenu: boolean = false;
  expandedBlocks: Set<string> = new Set<string>();

  selectedApartament: any = null;
  apartaments: any = {};
  billData: any = {};

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit(): void {
    this.loadBlocks();
  }

  loadBlocks(): void {
    this.blockService.getDataBlocks().subscribe(blocks => {
      this.blocks = blocks;
    });
  }

  toggleBlock(blockId: string): void {
    if (this.expandedBlocks.has(blockId)) {
      this.expandedBlocks.delete(blockId);
    } else {
      this.expandedBlocks.add(blockId);
      this.loadApartments(blockId);
    }
  }

  selectBlock(block: any): void {
    this.selectedBlock = block;
    this.bills.blockID = block.id;
  }

  loadApartments(blockId: string): void {
    if (!this.apartaments[blockId]) {
      this.apartamentService.getApartamentByBlockID(blockId).subscribe(apartaments => {
        this.apartaments[blockId] = apartaments;
      });
    }
  }

  addBill(): void {
    if (this.selectedApartament && this.billData) {
      this.billData.apartament_number = this.selectedApartament.id;
      this.billData.blockID = this.selectedApartament.blockID;
      this.maintenanceService.addBill(this.billData)
        .then(() => {
          console.log('Bill added successfully!');
          this.selectedApartament = null; // Close modal after adding bill
        })
        .catch(error => console.error('Error adding bill:', error));
    } else {
      console.error('Invalid apartment or bill data.');
    }
  }

  openAddBillModal(apartament: any): void {
    console.log('Opening modal for apartament:', apartament.id); // Debug log
    this.selectedApartament = apartament;
    this.billData = {
      apartament_number: apartament.id || '', // Ensure value is not undefined
      blockID: apartament.blockID || '', // Ensure value is not undefined
      cleaning_fee: '',
      judet: '',
      month: '',
      new_meter_index: '',
      old_meter_index: '',
      other_expenses: '',
      total_water_price: '',
      water_consumption: '',
      year: '',
    };
  }

  toggleActionsMenu(event: MouseEvent): void {
    event.stopPropagation(); // Oprire propagare eveniment pentru a preveni închiderea meniului în timpul deschiderii
    this.showActionsMenu = !this.showActionsMenu; // Invertim starea meniului de acțiuni
  }


}
