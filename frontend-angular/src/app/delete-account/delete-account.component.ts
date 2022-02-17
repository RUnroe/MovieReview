import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

const DeleteAccount = () => {

    const removeAccount = async () => {
        await fetch(`http://localhost:3005/api/user`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.ok) {
                //setMessage('Account Removed');
                return res.json();
            }
            throw new Error('Failed to delete account');
        })
      }
    }
  }
}
