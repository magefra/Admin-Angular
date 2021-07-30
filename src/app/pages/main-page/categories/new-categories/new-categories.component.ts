import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
     'name': ['', Validators.required],
     'url': ['', Validators.required],
     'title_list': ['', Validators.required]
    });


    formSubmited = false;



    imgTemp = "";
    
    
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /* ====================================
      Validación personalizada 
  ===================================== */
  get image() {return this.f.controls.image}
  
  

  invalidField(field: string)
  {

    return functions.invalidField(field, this.f, this.formSubmited);
    
  }


  saveCategory(){
    this.formSubmited  = true;

    if(this.f.invalid){
      return;
    }


  }


  validateImage(e: any){
    functions.validateImage(e).then( (resp:any) =>{
        this.imgTemp = resp;
    });
  }

}
