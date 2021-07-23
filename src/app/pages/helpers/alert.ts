import Swal,{SweetAlertIcon} from 'sweetalert2';

export class alerts{
    
    static basicAlert(title: string, texto: string, icon: SweetAlertIcon){
        Swal.fire(title, texto, icon);
    }
}