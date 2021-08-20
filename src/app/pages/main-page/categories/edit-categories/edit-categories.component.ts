import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { functions } from '../../../helpers/functions';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Icategories } from 'src/app/interface/icategories';
import { stringify } from '@angular/compiler/src/util';
import { ImagesService } from 'src/app/services/images.service';
import { alerts } from 'src/app/pages/helpers/alert';
import {MatDialogRef, MAT_DIALOG_DATA}  from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export interface IDialogData{
  id: string;
}


@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {

  public f = this.fb.group(
    {
     'icon':['', Validators.required],
     'image': ['', Validators.required],
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

     /* =========================
       Visualizar el icono
      ========================== */
      iconView = "";


  /* =========================
       Subir la imagen al servidor
      ========================== */

      uploadFile = "";


       /* =========================
       Variable para recargar
      ========================== */
      loadData = false;

      /* =========================
       Visualizar el nombre de la categoria
      ========================== */
      nameView = "";

      /* =========================
       Visualizar el listado de los titulos
      ========================== */
      titleView = "";

  constructor(private fb: FormBuilder,
              private categoriesService: CategoriesService,
              private imagenService: ImagesService,
              public dialogRef : MatDialogRef<EditCategoriesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void {

    this.categoriesService.getItem(this.data.id)
    .subscribe(
      (resp: any)=>{
        this.icon.setValue(resp.icon);
        this.iconView = `<i class="${resp.icon}"></i>`;
        this.imgTemp = `${environment.urlFiles}categories/${resp.image}`;
        this.nameView = resp.name;
        this.urlInput = resp.url;
        this.titleView =JSON.parse(resp.title_list);
      }
    );
  }

  /* ====================================
      Validación personalizada
  ===================================== */
  get name() {return this.f.controls.name}
  get image() {return this.f.controls.image}
  get titleList() {return this.f.controls.title_list}
  get icon() {return this.f.controls.icon}


  invalidField(field: string)
  {

    return functions.invalidField(field, this.f, this.formSubmited);

  }


  editCategory(){

    this.loadData = true;

     /* =============================================
        Validamos que el formulario haya sido enviado
        ============================================= */
    this.formSubmited  = true;


     /* =============================================
        Validamos que el formulario este correcto
        ============================================= */
    if(this.f.invalid){
      return;
    }


     /* =============================================
        subir la imagen al servidor
        ============================================= */
        this.imagenService.uploadImagen(this.uploadFile, "categories", "",170, 170)
        .subscribe( (resp: any) =>{
            if(resp.status ===200){
                /* =============================================
                  Capturamos la información del formulario en la interfaz
                   ============================================= */

                  const dataCategory: Icategories = {
                    icon: this.f.controls.icon.value.split('"')[1],
                    image: resp.result,
                    name: this.f.controls.name.value,
                    title_list: JSON.stringify(this.f.controls.title_list.value),
                    url : this.urlInput,
                    view: 0,
                    state: "hidden"

              };

           /* =============================================
              Guardar en la base de datos la info de la categoria.
              ============================================= */
             this.categoriesService.postData(dataCategory, localStorage.getItem('token'))
             .subscribe(
              resp => {
                  this.dialogRef.close('save');

                  alerts.basicAlert("Ok", 'The category has been saved', "success");


              },
              err =>{
                  alerts.basicAlert("Error", "Category saviing errror", "error");
              }

             );
            }else{
              alerts.basicAlert("Error", "Invalid Picture", "error");
            }
        });


        this.loadData = false;

  }


  validateImage(e: any){
    functions.validateImage(e).then( (resp:any) =>{
        this.imgTemp = resp;

        this.uploadFile = e;
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

                    }
                  }

                )
            })
        };
     }


     add(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();

      // Add our title list
      if (value) {
        this.f.controls.title_list.value.push(value.trim());
      }

      // Clear the input value
      if (event.input) {
        event.input.value = '';
      }

      this.f.controls.title_list.updateValueAndValidity();

    }

    remove(title: any): void {
      const index = this.f.controls.title_list.value.indexOf(title);

      if (index >= 0) {
        this.f.controls.title_list.value.splice(index, 1);
      }

      this.f.controls.title_list.updateValueAndValidity();
    }



    /* =======================================
       Visualizar el icono
    ========================================= */
    viewIcon(e: any){
      this.iconView = e.target.value;
      e.target.value = this.f.controls.icon.value.split('"')[1];


    }


}
