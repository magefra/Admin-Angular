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

    uploadImagen(file : any, path: string, folder: string, width: number, height: number){
      var formData = new FormData();
      formData.append("file", file.target.files[0]);
      formData.append("path", path);
      formData.append("folder", folder);
      formData.append("width", width.toString());
      formData.append("height", height.toString());

      return this.http.post(environment.adminFiles, formData);
    }
}
