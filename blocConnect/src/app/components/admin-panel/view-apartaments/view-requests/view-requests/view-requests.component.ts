import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit{

  constructor(private requestsService: RequestsService) {}

  requests: any[] = [];

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestsService.getRequests().subscribe(requests => {
      this.requests = requests.map(request => {
        return {
          id: request.payload.doc.id,
          ...request.payload.doc.data()
        }
      });
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


}
