import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private http: HttpClient,
              private loginService: LoginService){

  }


  canActivate(): Promise<boolean>  {

    return new Promise( resolve => {

      /* ===================================
      Validamos que el token si existe
      ==================================== */

      if(localStorage.getItem('token') != null){
         /* ===================================
          validamos si el token es real
          ==================================== */

          this.loginService.obtenerToken()
          .subscribe(
          resp =>{
            resolve(true);
          },
          err =>{
            console.log(err);

            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            this.router.navigateByUrl('/login');
            resolve(false);
          }
        );

       
      }else{
        this.router.navigateByUrl('/login');
        resolve(false);
      }
    });
  }
  
}
