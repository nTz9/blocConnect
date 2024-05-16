import { Component, OnInit } from '@angular/core';
import { BlockService } from 'src/app/services/block.service';

@Component({
  selector: 'app-view-blocks',
  templateUrl: './view-blocks.component.html',
  styleUrls: ['./view-blocks.component.css']
})
export class ViewBlocksComponent implements OnInit{
  blocks: any[] = [];
  selectedBlock: any = null;

  searchText: string = '';

  showActionsMenu: boolean = false;
  showAddBlockModal: boolean = false;
  newBlock: any = {};

  constructor(private blockService: BlockService) {}

  ngOnInit(): void {
    this.loadBlocks();
  }

  loadBlocks(): void {
    this.blockService.getBlocks().subscribe(blocks => {
      this.blocks = blocks.map(block => {
        return {
          id: block.payload.doc.id, // Obține documentID-ul
          ...block.payload.doc.data() // Obține datele documentului
        };
      });
    });
  }

  saveBlock(): void {
    if (this.selectedBlock && this.selectedBlock.id) {
      this.blockService.updateBlock(this.selectedBlock.id, this.selectedBlock)
        .then(() => {
          console.log('Block updated successfully!');
          this.selectedBlock = null; // Închide modalul după actualizare
        })
        .catch(error => console.error('Error updating block:', error));
    } else {
      console.error('Invalid block ID.');
    }
  }

  toggleActionsMenu(event: MouseEvent): void {
    event.stopPropagation(); // Oprire propagare eveniment pentru a preveni închiderea meniului în timpul deschiderii
    this.showActionsMenu = !this.showActionsMenu; // Invertim starea meniului de acțiuni
  }

  addBlock(): void {
    // Adaugă noul bloc utilizând serviciul BlockService
    this.blockService.addBlock(this.newBlock)
      .then(() => {
        console.log('Block added successfully!');
        this.loadBlocks(); // Reîncarcă datele blocurilor după adăugarea unui nou bloc
        this.toggleAddBlockModal(); // Închide modalul după adăugare
      })
      .catch(error => {
        console.error('Error adding block: ', error);
      });
  }

  toggleAddBlockModal(): void {
    this.showAddBlockModal = !this.showAddBlockModal;
    this.newBlock = {
      Name: '',
      Judetul: '',
      Oras: '',
      Strada: '',
      Adresa: '',
      Administrator: ''
    };
    // Resetează valorile câmpurilor noului bloc atunci când se deschide sau se închide modalul
  }

  openUpdateModal(block: any): void {
    this.selectedBlock = { ...block }; // Copiem utilizatorul pentru a evita modificările directe în obiectul original
  }

  deleteBlock(blockId: string): void {
    if (confirm("Are you sure you want to delete this block?")) {
      this.blockService.deleteBlock(blockId)
        .then(() => {
          console.log('Block deleted successfully!');
          // Reload blocks after deletion
          this.loadBlocks();
        })
        .catch(error => {
          console.error('Error deleting block: ', error);
        });
    }
  }

  filterBlocks(): void {
    const searchText = this.searchText.toLowerCase().trim();
  
    // Verificați dacă există text de căutare
    if (searchText) {
      // Filtrarea utilizatorilor în funcție de CNP sau Email
      this.blocks = this.blocks.filter(block => {
        return block.Oras.toLowerCase().includes(searchText);
      });
    } else {
      // Dacă nu există text de căutare, afișați toți utilizatorii
      this.loadBlocks();
    }
  }
  

}
