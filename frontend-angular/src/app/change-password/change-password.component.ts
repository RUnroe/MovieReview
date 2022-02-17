import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


const ChangePassword = () => {

    const changePassword = async () => {
        await fetch(`http://localhost:3005/api/user`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                //password: newPassword
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to update password');
        })
      }
    }
  }
}