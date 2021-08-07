import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { functions } from '../../../helpers/functions';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}


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
     'name': ['', {validators: [Validators.required, Validators.pattern('[,\\a-zA-ZáéíóúñÁÉÍÓÚñ ]*')], asyncValidators: [this.isRepeatCategory()], updateOn:'blur'}],
     'title_list': ['', Validators.required]
    });


    formSubmited = false;



    imgTemp = "";
    

    /* =========================
       Visualizar la url
      ========================== */
    urlInput = "";
    
    /* ============================
      Configuración Mat Chips: Etiquetas dentro del Input Title List
      ============================= */
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    fruits: Fruit[] = [
      {name: 'Lemon'},
      {name: 'Lime'},
      {name: 'Apple'},
    ];
  

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
            const name =functions.createUrl( control.value);

            return new Promise((resolve) =>{
                this.categoriesService.getFilterData("url", name)
                .subscribe(
               
                  resp =>{

                    console.log(resp);
                  

                    if(Object.keys(resp).length > 0){
                      resolve({category: true})
                    }else{

                      this.urlInput = name;
                      resolve({category: false})
                    }
                  }

                )
            })
        };
     }


     add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
  
      // Add our fruit
      if (value) {
        this.fruits.push({name: value});
      }
  
      // Clear the input value
      if (event.input) {
        event.input.value = '';
      }
    }

    remove(fruit: Fruit): void {
      const index = this.fruits.indexOf(fruit);
  
      if (index >= 0) {
        this.fruits.splice(index, 1);
      }
    }

}
