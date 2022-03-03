import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  userId: String = "";
  constructor(private apollo: Apollo) { }

  removeAccount = async () => {
    console.log(this.userId);
    //TODO Test this error
    this.apollo
        .watchQuery({
          query: gql`
            {
              removeUser(user_id: ${this.userId})
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          console.log(result);
          //TODO redirect to home page
        });
    // await fetch(`http://localhost:3005/api/user`, {
    //     method: 'DELETE',
    //     credentials: 'include',
    //     headers: { 'Content-Type': 'application/json' }
    // }).then((res) => {
    //     if (res.ok) {
    //         //setMessage('Account Removed');
    //         return res.json();
    //     }
    //     throw new Error('Failed to delete account');
    // })
  }

  ngOnInit(): void {
    this.apollo
        .watchQuery({
          query: gql`
            {
              getCredentials {
                fname
                lname
                is_admin
                api_key
                user_id
              }
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          this.userId = (result?.data?.getCredentials?.user_id);
        });
  }
}
