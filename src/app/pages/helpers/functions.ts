import { FormGroup } from "@angular/forms";

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
}