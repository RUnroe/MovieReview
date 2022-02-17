import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  submitted = false;

  registerForm = new FormGroup({
    fName: new FormControl('', [Validators.required, Validators.pattern(/./)]),
    lName: new FormControl('', [Validators.required, Validators.pattern(/./)]),
    street: new FormControl('', [Validators.required, Validators.pattern(/../)]),
    city: new FormControl('', [Validators.required, Validators.pattern(/../)]),
    state: new FormControl('', [Validators.required, Validators.pattern(/^[a-z, A-Z]{2}$/)]),
    zip_code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5}(-[0-9]{4})?$/m)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(1?\([0-9]{3}\)( |)|(1-|1)?[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/m)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^.{6,}$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/\w+@\w+\.\w+/)])
  });

  onSubmit() {
    let form = this.registerForm;

    this.submitted = true;

    // console.log(form.value)
    //fetch here
    return fetch(`http://localhost:3005/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fname: form.get('fName')?.value,
        lname: form.get('lName')?.value,
        password: form.get('password')?.value,
        email: form.get('email')?.value,
        phone: form.get('phone')?.value,
        state: form.get('state')?.value,
        city: form.get('city')?.value,
        street: form.get('street')?.value,
        zip_code: form.get('zip_code')?.value
      })
    }).then((res) => {
      if (res.ok) {
        this.router.navigate(['/login']);
        return res.json()
      }
      return;
    })
  }

  onRedirect() {
    if (this.registerForm.valid) {
      // this.router.navigate(['/login']);
    } else {
      console.log('not valid')
    }
  }

  get form() { return this.registerForm.controls; }

  ngOnInit(): void { }
}
