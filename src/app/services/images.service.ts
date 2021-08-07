import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  

  constructor(private http: HttpClient) { }

  /* ===========================================
    Función para subir las imagenes al servidor
    ============================================ */

    uploadImagen(){
      var formData = new FormData();
      formData.append();

      return this.http.post(environment.adminFiles, formData);
    }
}
