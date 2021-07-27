import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  
  /* ==============================================
     Tomar la data de las categorias
  ================================================ */

  getData(){
    return this.http.get(`${environment.urlFirebase}categories.json`);
  } 
  


}
