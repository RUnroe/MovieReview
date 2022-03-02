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

  changePassword = async () => {
    if(this.newPassword.length >= 6) { 
      console.log(this.newPassword);
      this.apollo
          .watchQuery({
            query: gql`
              {
                updatePassword(password: ${this.newPassword})
              }
            `,
          })
          .valueChanges.subscribe((result: any) => {
            console.log(result);
            //TODO display message
            this.messageClass = "positive";
            this.message = "Successfully changed password!"
          });
    }
    else {
      //TODO display error
      this.messageClass = "delete-message";
      this.message = "Error when changing password"
    }


    // await fetch(`http://localhost:3005/api/user`, {
    //     method: 'PUT',
    //     credentials: 'include',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         //password: newPassword
    //     })
    // }).then((res) => {
    //     if (res.ok) {
    //         return res.json();
    //     }
    //     throw new Error('Failed to update password');
    // })
  }
  ngOnInit(): void {

  }

}