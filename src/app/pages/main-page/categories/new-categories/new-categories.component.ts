import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { functions } from '../../../helpers/functions';
@Component({
  selector: 'app-new-categories',
  templateUrl: './new-categories.component.html',
  styleUrls: ['./new-categories.component.css']
})
export class NewCategoriesComponent implements OnInit {

  public f = this.fb.group(
    {
     'icon':['', Validators.required],
     'image': ['', Validators.required],
     //'name': ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúñÁÉÍÓÚñ ]*')]],
     'name': ['', {validators: [Validators.required, Validators.pattern('[a-zA-ZáéíóúñÁÉÍÓÚñ ]*')], asyncValidators: [this.isRepeatCategory()], updateOn:'blur'}],
     'url': ['', Validators.required],
     'title_list': ['', Validators.required]
    });


    formSubmited = false;



    imgTemp = "";
    
    
  constructor(private fb: FormBuilder,
              private categoriesService: CategoriesService) { }

  ngOnInit(): void {
  }

  /* ====================================
      Validación personalizada 
  ===================================== */
  get name() {return this.f.controls.name}
  get image() {return this.f.controls.image}
  
  

  invalidField(field: string)
  {

    return functions.invalidField(field, this.f, this.formSubmited);
    
  }


  saveCategory(){
    this.formSubmited  = true;

    console.log(this.f);

    if(this.f.invalid){
      return;
    }


  }


  validateImage(e: any){
    functions.validateImage(e).then( (resp:any) =>{
        this.imgTemp = resp;
    });
  }


 /* ================================================
     Validar que el nombre de categoría no se repita
     =============================================== */


     isRepeatCategory(){
        return (control: AbstractControl) => {
            const name = control.value;

            return new Promise((resolve) =>{
                this.categoriesService.getFilterData("name", name)
                .subscribe(
               
                  resp =>{

                    console.log(resp);
                  

                    if(Object.keys(resp).length > 0){
                      resolve({category: true})
                    }else{
                      resolve({category: false})
                    }
                  }

                )
            })
        };
     }

}
