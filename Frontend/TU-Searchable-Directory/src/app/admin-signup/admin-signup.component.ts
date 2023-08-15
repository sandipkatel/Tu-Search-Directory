import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {

  // constructor(private authServive: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isLogin: boolean = true;
  hasError: boolean = false;
  errorText: string;
  isAuthenticating: boolean = false;


  constructor(private authServive: AuthService, private router: Router) { }


  onSignUp(form: NgForm) {
    let name = form.value['name'];
    let email = form.value['email'];
    let password = form.value['password'];
    this.isAuthenticating = true;
    this.authServive.adminsignUp(name,email, password).subscribe((response) => {
      console.log(response)
      if(!response.isAuth) {
        this.hasError = true;
        this.errorText = response.message;
        this.isAuthenticating = false;
      } else {
        this.hasError = false;
        this.isAuthenticating = false;
        console.log(response.message);
        this.authServive.setInfo(name, email, true);
        // this.authServive.setLogIn();
        this.router.navigate(['/search']);
        
      }
    })
  }

}
