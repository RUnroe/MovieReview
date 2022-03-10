import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string = "";
  message: string = "";
  messageClass: string = "";

  constructor(private apollo: Apollo) { }
  //TODO Test this error
  changePassword = async () => {
    // if(this.newPassword.length >= 6) { 
    //   // console.log(this.newPassword);
    //   this.apollo
    //       .mutate({
    //         mutation: gql`
    //           {
    //             updatePassword(password: ${this.newPassword})
    //           }
    //         `,
    //       })
    //       .subscribe((result: any) => {
    //         console.log(result);
    //         //Display message
    //         this.messageClass = "positive";
    //         this.message = "Successfully changed password!"
    //       });
    // }
    // else {
    //   //Display error
    //   this.messageClass = "delete-message";
    //   this.message = "Error when changing password"
    // }

if(this.newPassword.length >= 6) { 
    await fetch(`http://localhost:3005/api/user`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            password: this.newPassword
        })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Failed to update password');
    })
      }
  else {
    //Display error
    this.messageClass = "delete-message";
    this.message = "Error when changing password"
  }
  }
  ngOnInit(): void {

  }

}