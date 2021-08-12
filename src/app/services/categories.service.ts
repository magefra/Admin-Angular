import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Icategories } from '../interface/icategories';


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

 
  /* ==============================================
     Guardar información de la categoria
  ================================================ */


  postData(data: Icategories, token: any){
      return this.http.post(`${environment.urlFirebase}categories.json?auth=${token}`, data);
  }


  /* =============================================
     Actualización de los registros
     ============================================= */
  pathData(id:string, data: object, token: any){
      return this.http.patch(`${environment.urlFirebase}categories/${id}.json?auth=${token}`,data);
  }

}
