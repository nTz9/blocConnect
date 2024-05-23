import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { BlockService } from 'src/app/services/block.service';

interface Announcement {
  id: string;
  title: string;
  category: string;
  message: string;
  startDate: Date;
  endDate: Date;
  blocId: string;
}

@Component({
  selector: 'app-view-announcements',
  templateUrl: './view-announcements.component.html',
  styleUrls: ['./view-announcements.component.css']
})
export class ViewAnnouncementsComponent implements OnInit{

  constructor(
    private blockService: BlockService,
    private announcementService: AnnouncementService,
  ) {}

  ngOnInit(): void {
    this.loadBlocks();
    this.loadAnnouncements();
  }

  blocks: any[] = [];
  announcements: any[] = [];
  selectedAnnouncement: any = null;

  showActionsMenu: boolean = false;
  expandedBlocks: Set<string> = new Set<string>();

  loadBlocks(): void {
    this.blockService.getDataBlocks().subscribe(blocks => {
      this.blocks = blocks;
    });
  }

  loadAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(announcements => {
      this.announcements = announcements;
    });
  }


  toggleBlock(blockId: string): void {
    if (this.expandedBlocks.has(blockId)) {
      this.expandedBlocks.delete(blockId);
    } else {
      this.expandedBlocks.add(blockId);
    }
  }

  getAnnouncementsForBlock(blockId: string): Announcement[] {
    return this.announcements.filter(announcement => announcement.blocId === blockId);
  }

  toggleActionsMenu(event: MouseEvent): void {
    event.stopPropagation(); // Oprire propagare eveniment pentru a preveni închiderea meniului în timpul deschiderii
    this.showActionsMenu = !this.showActionsMenu; // Invertim starea meniului de acțiuni
  }

  openUpdateModal(announcement: any): void {
    this.selectedAnnouncement = { ...announcement }; // Copiem utilizatorul pentru a evita modificările directe în obiectul original
  }

  deleteAnnouncement(announcementID: string): void {
    if (confirm("Are you sure you want to delete this announcement?")) {
      this.announcementService.deleteAnnouncement(announcementID)
        .then(() => {
          console.log('Announcement deleted successfully!');
          // Reload blocks after deletion
          this.loadAnnouncements();
        })
        .catch(error => {
          console.error('Error deleting announcement: ', error);
        });
    }
  }

  saveAnnouncement(): void {
    if (this.selectedAnnouncement && this.selectedAnnouncement.id) {
      this.announcementService.updateAnnouncement(this.selectedAnnouncement.id, this.selectedAnnouncement)
        .then(() => {
          console.log('Announcement updated successfully!');
          this.selectedAnnouncement = null; // Închide modalul după actualizare
        })
        .catch(error => console.error('Error updating announcement:', error));
    } else {
      console.error('Invalid announcement ID.');
    }
  }
}
