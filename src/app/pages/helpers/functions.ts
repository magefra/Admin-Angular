import { FormGroup } from "@angular/forms";
import Swal,{SweetAlertIcon} from 'sweetalert2';
import { alerts } from "./alert";

export class functions  {
    

    static invalidField(field: string,f: FormGroup, formSubmited: boolean):boolean{
        if(formSubmited && f.controls[field].invalid ){
            return true;
          }else{
            return false;
          }
    }

    /* ============================================
     Función para determinar tamaños de pantalla
    ==============================================*/
    static screenSize(minWidth: number, maxtWidth: number): boolean{


      if(window.matchMedia(`(min-width:${minWidth}px) and (max-width:${maxtWidth}px)`).matches){
          return true;
      }
      
      return false;
    }

     /* ============================================
     Función para validar la imagen
    ==============================================*/

    static validateImage(e: any):any{
      return new Promise( resolve =>{
        const image = e.target.files[0];

        console.log(image);
           /* ============================================
              Validamos el formato
            ==============================================*/
            if(image["type"] !== "image/jpeg" && image["type"] !== "image/png"){
                alerts.basicAlert("error", "The image must b in JPG or PNG format","error");

                return;
            }
           /* ============================================
              Validamos el tamaño
            ==============================================*/
            else if(image["size"] > 2000000){
              alerts.basicAlert("error", "The image must not weigh more than 2MB","error");

                return;
            }

            /* ============================================
              Mostramos la imagen temporal
            ==============================================*/
            else{
              let data = new FileReader();
              data.readAsDataURL(image);

              data.onloadend = () =>{
                resolve(data.result);
              }
            }

      });
    }
}