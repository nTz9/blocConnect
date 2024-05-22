import { Component, OnInit } from '@angular/core';
import { ApartamentService } from 'src/app/services/apartament.service';
import { BlockService } from 'src/app/services/block.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit{

  constructor(
    private requestsService: RequestsService,
    private blockService: BlockService,
    private apartamentService: ApartamentService
  ) {}

  requests: any[] = [];
  filteredRequests: any[] = [];

  showActionsMenu: boolean = false;

  status: string[] = ["accepted", "rejected"];
  selectedStatus = '';
  searchText: string = '';

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestsService.getRequests().subscribe(requests => {
      this.requests = requests.map(request => {
        const requestData = {
          id: request.payload.doc.id,
          ...request.payload.doc.data()
        };

        // Obțineți informațiile despre apartament și bloc
        this.apartamentService.getApartamentInfo(requestData.apartamentId).subscribe(apartament => {
          requestData.apartamentInfo = apartament;
        });

        this.blockService.getBlockInfo(requestData.blockID).subscribe(block => {
          requestData.blockInfo = block;
        });

        return requestData;
      });
      this.filteredRequests = this.requests;
    });
  }

  acceptRequest(requestID:string, apartamentID: string, ownerCNP:string): void {
    if(apartamentID && ownerCNP){
      this.requestsService.updateRequestStatus(requestID, 'accepted')
      .then(() => {
        return this.requestsService.addOwnerToApartment(apartamentID, ownerCNP);
      })
      .then(() => {
        console.log("Request accepted");
      })
      .catch(err => {
        console.error("Error accepting request: ",err);
      });
    }else {
      console.error("Invalid request ID");
    }
  }

  rejectRequest(requestID:string, apartamentID: string, ownerCNP:string): void {
    if(apartamentID && ownerCNP){
      this.requestsService.updateRequestStatus(requestID, 'rejected')
      .then(() => {
        console.log("Request rejected");
      })
      .catch(err => {
        console.error("Error accepting request: ",err);
      });
    }
  } 

  toggleActionsMenu(event: MouseEvent): void {
    event.stopPropagation(); // Oprire propagare eveniment pentru a preveni închiderea meniului în timpul deschiderii
    this.showActionsMenu = !this.showActionsMenu; // Invertim starea meniului de acțiuni
  }

  filterRequests(): void {
    const searchText = this.searchText.toLowerCase().trim();
  
    // Verificați dacă există text de căutare
    if (searchText) {
      // Filtrarea utilizatorilor în funcție de CNP sau Email
      this.filteredRequests = this.requests.filter(request => {
        return request.cnp.toLowerCase().includes(searchText);
      });
    } else {
      // Dacă nu există text de căutare, afișați toți utilizatorii
      this.loadRequests();
    }
  }

  filterByStatus(): void {
    if (!this.selectedStatus) {
      // Dacă nu este selectat niciun status, afișăm toate cererile
      this.filteredRequests = this.requests;
    } else {
      // Filtrăm cererile după status
      this.filteredRequests = this.requests.filter(request => request.status === this.selectedStatus);
    }
  }
  
  

}
