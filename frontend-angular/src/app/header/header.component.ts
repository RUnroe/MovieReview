import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

const Header = () => {

    //Add logout dropdown
    let options = [
        {
            //value: 'one', label: `${loggedInUser}`
        },
        {
            value: 'two', label: 'Change Password'
        },
        {
            value: 'three', label: 'Delete Account'
        }
    ]

    let defaultOption = options[0];

    //let navigateSettings = (option) => {
    //     if (option.value === 'two') {
    //         navigate('/changepassword');
    //     } else if (option.value === 'three') {
    //         navigate('/deleteaccount')
    //     }
    // }

    const getLoggedInUser = async () => {
        await fetch(`http://localhost:3005/api/auth`, {
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
            //setLoggedInUser(data.fname + ' ' + data.lname);
        })
      }
    }
  }
}
