import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin } from '../interface/ilogin';
import {map}  from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  
  obtenerToken(){
    let body = {
      idToken: localStorage.getItem('token')
    }

   return this.http.post(environment.urlGetUser, body);
  }

  login(data: ILogin){
    return this.http.post(environment.urlLogin,data)
    .pipe(
      map((resp: any) =>{
        console.log(resp);

        localStorage.setItem('token', resp.idToken);
        localStorage.setItem('refreshToken', resp.refreshToken);
      })
    );
  }


}
