import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {
   @Input()selectedUserId: String = "";
   @Input()selectedUserName: String = "";
  @Input() isModalOpen: boolean = false;
  @Output() toggleDeleteModalEvent = new EventEmitter<boolean>();
  user: any = {};
  
  constructor() { }
  openModal(): void {
    console.log("open modal")
    this.toggleDeleteModalEvent.emit(true);
  }
  closeModal(): void {
    console.log("close modal")
    this.toggleDeleteModalEvent.emit(false);
  }

  deleteUser (): void {
    fetch(`http://localhost:3005/api/user/${this.selectedUserId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
      if (res.ok) {
          console.log(`Account (${this.selectedUserId}) Removed`);
          return res.json();
      }
      throw new Error('Failed to delete account');
  })
  }

  ngOnInit(): void {
    fetch(`http://localhost:3005/api/auth`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then((data) => {
          // console.log(data);
          this.user = (data);
        })
  }

}
