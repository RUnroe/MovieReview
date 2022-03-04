import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { }
  submitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/\w+@\w+\.\w+/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^.{6,}$/)])
  });
  ngOnInit(): void {
     
  }

  async onSubmit() {
    let form = this.loginForm;
    this.submitted = true;
 
    
    console.log(form.value)
    // fetch here
    return fetch(`http://localhost:3005/api/auth`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: form.get('password')?.value,
        email: form.get('email')?.value,
      })
    }).then((res) => {
      if (res.ok) {
        this.router.navigate(['/']);
        return res.json()
      }
      return;
    })

    
  }

  onRedirect() {
    if (this.loginForm.valid) {
      // this.router.navigate(['/login']);
      console.log('It worked?')
    } else {
      console.log('not valid')
    }
  }

  get form() { return this.loginForm.controls; }
}
