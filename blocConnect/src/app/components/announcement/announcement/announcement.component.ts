import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { ApartamentService } from 'src/app/services/apartament.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlockService } from 'src/app/services/block.service';
import { UserService } from 'src/app/services/user.service';
import { WaterMeterService } from 'src/app/services/water-meter.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit{
  
  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private userService: UserService,
    private apartamentService: ApartamentService,
    private waterMeterService: WaterMeterService,
    private blockService: BlockService,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit(): void {
    this.getAnnouncement();
  }

  announcements: any = [];
  

  user$ = this.authService.getCurrentUser();
  getAnnouncement() {
    this.userService.getLoggedUserId().subscribe(cnp => {
      this.apartamentService.getAvailableApartamentsByCNP(cnp).subscribe(apartament => {
        const blockIds = apartament.map((apartament: { blockID: any; }) => apartament.blockID);
        console.log(blockIds);
        this.announcementService.getAnnouncementsForBlocks(blockIds).subscribe(announcement => {
          this.announcements = announcement;
          console.log(this.announcements);
        })
      })
    })
  }

  // getAnnouncement() {
  //   this.userService.getLoggedUserId().pipe(
  //     switchMap(cnp => this.apartamentService.getAvailableApartamentsByCNP(cnp)),
  //     map(apartaments => apartaments.map(apartament => apartament.blockID)),
  //     switchMap(blockIds => this.announcementService.getAnnouncementsForBlocks(blockIds))
  //   ).subscribe(announcements => {
  //     this.announcements = announcements;
  //     console.log(this.announcements);
  //   });
  // }


}
