import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { functions } from '../helpers/functions';
import {ILogin} from 'src/app/interface/ilogin'
import { LoginService } from 'src/app/services/login.service';
import {alerts} from 'src/app/pages/helpers/alert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


public f = this.fb.group(
  {
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  formSubmited = false;

  constructor(private fb : FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    

    this.formSubmited  = true;

    if(this.f.invalid){
      return;
    }

    const data: ILogin = {
      email: this.f.controls.email.value,
      password:this.f.controls.password.value,
      returnSecureToken : true

    }

    this.loginService.login(data)
    .subscribe(
      (resp) =>{
        this.router.navigateByUrl("/");
      },
      (err) =>{
        if(err.error.error.message == "EMAIL_NOT_FOUND"){
          alerts.basicAlert("Error", "Invalid Email", "error");
        }else if(err.error.error.message == "INVALID_PASSWORD"){
          alerts.basicAlert("Error", "Invalid Password", "error");
        }else{
          alerts.basicAlert("Error", "Ah error ocurred", "error");
        }

     
       
      }

    )
  }

  invalidField(field: string)
  {

   return functions.invalidField(field, this.f, this.formSubmited);
    
  }

}
