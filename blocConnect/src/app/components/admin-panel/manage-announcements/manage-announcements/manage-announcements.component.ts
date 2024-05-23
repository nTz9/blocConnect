import { Component } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { BlockService } from 'src/app/services/block.service';

interface Announcement {
  blocId: string;
  category: string;
  startDate: Date;
  endDate: Date;
  message: string;
  title: string;
  visible: boolean;
}

@Component({
  selector: 'app-manage-announcements',
  templateUrl: './manage-announcements.component.html',
  styleUrls: ['./manage-announcements.component.css']
})
export class ManageAnnouncementsComponent {

  blocks: any[] = [];
  selectedBlock: any = null;
  announcement: Announcement = {
    blocId: '',
    category: '',
    startDate: new Date(),
    endDate: new Date(),
    message: '',
    title: '',
    visible: true
  };
  visibilityCheckInterval: any;

  announcementText: string = '';

  showActionsMenu: boolean = false;
  searchText: string = '';

  constructor(
    private blockService: BlockService,
    private announcementService: AnnouncementService,
  ) {}

  ngOnInit(): void {
    this.loadBlocks();
    this.checkVisibilityPeriodically();
  }

  ngOnDestroy(): void {
    if (this.visibilityCheckInterval) {
      clearInterval(this.visibilityCheckInterval);
    }
  }

  loadBlocks(): void {
    this.blockService.getDataBlocks().subscribe(blocks => {
      this.blocks = blocks;
    });
  }

  selectBlock(block: any): void {
    this.selectedBlock = block;
    this.announcement.blocId = block.id;
  }

  sendAnnouncement(): void {
    if (this.selectedBlock && this.announcement.message.trim() && this.announcement.title.trim()) {
      this.announcementService.sendAnnouncement(this.announcement).then(() => {
        console.log('Announcement sent successfully!');
        this.resetForm();
      }).catch(error => {
        console.error('Error sending announcement: ', error);
      });
    } else {
      console.error('Announcement form is incomplete.');
    }
  }

  resetForm(): void {
    this.announcement = {
      blocId: '',
      category: '',
      startDate: new Date(),
      endDate: new Date(),
      message: '',
      title: '',
      visible: true
    };
    this.selectedBlock = null;
  }

  checkVisibilityPeriodically(): void {
    this.announcementService.checkAndUpdateVisibility();
    this.visibilityCheckInterval = setInterval(() => {
      this.announcementService.checkAndUpdateVisibility();
    }, 60 * 1000); // Verificare la fiecare minut, modifică acest interval după nevoie
  }

  toggleActionsMenu(event: MouseEvent): void {
    event.stopPropagation(); // Oprire propagare eveniment pentru a preveni închiderea meniului în timpul deschiderii
    this.showActionsMenu = !this.showActionsMenu; // Invertim starea meniului de acțiuni
  }

  filterAnnouncements(): void {
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
