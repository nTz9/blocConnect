import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit{

  users: any[] = [];
  selectedUser: any = null;
  showActionsMenu: boolean = false;
  searchText: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(cnp: string): void {
    this.userService.deleteUser(cnp)
     .then(() => 
       console.log('Utilizatorul a fost șters cu succes'))
     .catch(error => 
       console.log('Eroare la ștergerea utilizatorului', error));
  }

  // updateUserRole(userID: string, role: string): void {
  //   this.userService.updateUserRole(userID, role)
  //    .then(() => 
  //      console.log('Rolul utilizatorului a fost actualizat cu succes'))
  //    .catch(error => 
  //      console.log('Eroare la actualizarea rolului utilizatorului', error));
  // }

  openUpdateModal(user: any): void {
    this.selectedUser = { ...user }; // Copiem utilizatorul pentru a evita modificările directe în obiectul original
  }

  saveUser(): void {
    if (this.selectedUser && this.selectedUser.cnp) {
      this.userService.updateUser(this.selectedUser)
        .then(() => {
          console.log('Utilizatorul a fost actualizat cu succes!');
          this.selectedUser = null; // Închide modalul după actualizare
        })
        .catch(error => console.error('Eroare la actualizarea utilizatorului:', error));
    } else {
      console.error('CNP-ul utilizatorului nu este valid.');
    }
  }
  toggleActionsMenu(event: MouseEvent): void {
    event.stopPropagation(); // Oprire propagare eveniment pentru a preveni închiderea meniului în timpul deschiderii
    this.showActionsMenu = !this.showActionsMenu; // Invertim starea meniului de acțiuni
  }
  
  filterUsers(): void {
    const searchText = this.searchText.toLowerCase().trim();
  
    // Verificați dacă există text de căutare
    if (searchText) {
      // Filtrarea utilizatorilor în funcție de CNP sau Email
      this.users = this.users.filter(user => {
        return user.cnp.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText);
      });
    } else {
      // Dacă nu există text de căutare, afișați toți utilizatorii
      this.loadUsers();
    }
  }
  
  
  

}
