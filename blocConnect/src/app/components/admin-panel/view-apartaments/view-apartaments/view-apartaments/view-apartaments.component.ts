import { Component, OnInit } from '@angular/core';
import { ApartamentService } from 'src/app/services/apartament.service';
import { BlockService } from 'src/app/services/block.service';

@Component({
  selector: 'app-view-apartaments',
  templateUrl: './view-apartaments.component.html',
  styleUrls: ['./view-apartaments.component.css']
})
export class ViewApartamentsComponent implements OnInit{

  constructor(
    private blockService: BlockService,
    private apartamentService: ApartamentService
  ) {}

  ngOnInit(): void {
    this.loadApartaments();
    this.loadBlocks();
  }

  apartaments: any[] = [];
  filteredApartaments: any[] = [];

  selectedApartament: any = null;
  blocks: any[] = [];
  newOwner: string = '';

  searchText: string = '';

  showActionsMenu: boolean = false;

  showAddApartamentModal: boolean = false;
  newApartament: any = {};

  loadApartaments(): void {
    this.apartamentService.getApartaments().subscribe(apartaments => {
      this.apartaments = apartaments.map(apartament => {
        const apartamentData = {
          id: apartament.payload.doc.id,
          ...apartament.payload.doc.data()
        };

        this.blockService.getBlockInfo(apartamentData.blockID).subscribe(block => {
          apartamentData.blockInfo = block;
        });

        return apartamentData;
      });
      this.filteredApartaments = this.apartaments;
    }); 
  }
    

  toggleActionsMenu(event: MouseEvent): void {
    event.stopPropagation(); // Oprire propagare eveniment pentru a preveni închiderea meniului în timpul deschiderii
    this.showActionsMenu = !this.showActionsMenu; // Invertim starea meniului de acțiuni
  }

  openUpdateModal(apartament: any): void {
    this.selectedApartament = { ...apartament }; // Copiem utilizatorul pentru a evita modificările directe în obiectul original
    this.newOwner = '';
  }

  addOwner(): void {
    if (this.newOwner.trim() !== '') {
      this.selectedApartament.owners.push(this.newOwner.trim());
      this.newOwner = ''; // Resetează câmpul pentru noul proprietar
    }
  }

  // Nou: Metodă pentru ștergerea unui proprietar existent
  removeOwner(index: number): void {
    this.selectedApartament.owners.splice(index, 1);
  }

  loadBlocks(): void {
    this.blockService.getDataBlocks().subscribe(blocks => {
      this.blocks = blocks;
    });
  }

  saveApartament(): void {
    if (this.selectedApartament && this.selectedApartament.id) {
      const updatedApartament = { ...this.selectedApartament };
      delete updatedApartament.blockInfo;  // Elimină câmpul blockInfo
  
      this.apartamentService.updateApartament(this.selectedApartament.id, updatedApartament)
        .then(() => {
          console.log('Apartament updated successfully!');
          this.selectedApartament = null; // Închide modalul după actualizare
          this.loadApartaments(); // Reîncarcă apartamentele
        })
        .catch(error => console.error('Error updating apartament:', error));
    } else {
      console.error('Invalid apartament ID.');
    }
  }
  

  deleteApartament(apartamentId: string): void {
    if (confirm("Are you sure you want to delete this apartament?")) {
      this.apartamentService.deleteApartament(apartamentId)
        .then(() => {
          console.log('Apartament deleted successfully!');
          // Reload blocks after deletion
          this.loadApartaments();
        })
        .catch(error => {
          console.error('Error deleting apartament: ', error);
        });
    }
  }

  addApartament(): void {
    // Adaugă noul bloc utilizând serviciul BlockService
    if (!Array.isArray(this.newApartament.owners)) {
      this.newApartament.owners = [];
    }
    this.apartamentService.addApartament(this.newApartament)
      .then(() => {
        console.log('Apartament added successfully!');
        this.loadApartaments(); // Reîncarcă datele blocurilor după adăugarea unui nou bloc
        this.toggleAddApartamentModal(); // Închide modalul după adăugare
      })
      .catch(error => {
        console.error('Error adding apartament: ', error);
      });
  }

  toggleAddApartamentModal(): void {
    this.showAddApartamentModal = !this.showAddApartamentModal;
    this.newApartament = {
      name: '',
      apartamentNumber: '',
      Scara: '',
      blockID: '',
      owners: []
    };
  }

  addNewOwner(): void {
    if (this.newOwner.trim() !== '') {
      this.newApartament.owners.push(this.newOwner.trim());
      this.newOwner = ''; // Resetează câmpul pentru noul proprietar
    }
  }

  removeNewOwner(index: number): void {
    this.newApartament.owners.splice(index, 1);
  }

  filterApartaments(): void {
    const searchText = this.searchText.toLowerCase().trim();
  
    if (searchText) {
        this.filteredApartaments = this.apartaments.filter(apartament => {
          const blockName = apartament.blockInfo?.name?.toLowerCase() || '';
          return blockName.includes(this.searchText.toLowerCase());
        });
      } else {
      // Dacă nu există text de căutare, afișați toți utilizatorii
      this.loadApartaments();
    }
  }

}
