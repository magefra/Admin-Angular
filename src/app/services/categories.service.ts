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
  
  /* ==============================================
     Tomar data filtrada de la colección de categorías de Firebase
  ================================================ */

  getFilterData(orderBy:string,equalTo: string){
      return this.http.get(`${environment.urlFirebase}categories.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
  }

}
