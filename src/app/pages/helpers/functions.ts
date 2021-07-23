import { FormGroup } from "@angular/forms";

export class functions  {
    

    static invalidField(field: string,f: FormGroup, formSubmited: boolean):boolean{
        if(formSubmited && f.controls[field].invalid ){
            return true;
          }else{
            return false;
          }
    }
}