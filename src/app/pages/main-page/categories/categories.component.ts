import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Icategories } from 'src/app/interface/icategories';
import { CategoriesService } from 'src/app/services/categories.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { functions } from '../../helpers/functions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class CategoriesComponent implements OnInit {

   /* ===========================
     Variable global que captura la ruta de los archivos de imagen
     =========================== */  
     path: string = environment.urlFiles;

     
  /* ===========================
     Variable para nombrar las columnas de nuestras tablas en material    
     =========================== */  

     displayedColumns: string[] = ['position', 
                                    'name',
                                    'actions'];


   /* ===========================
     Variable global que instancie la tada que aparecerá en la tabla
     =========================== */  
    dataSource!: MatTableDataSource<Icategories>;

    /* ===========================
      Variable global de categorias
      =========================== */  
    categories: Icategories[] = [];


    /* ===========================
      Variable global que informa a la vista cuando hay una expansión de la tabla.
      =========================== */  
    expandedElement!: Icategories | null;

    /*=========================================
      Variable global para definir tamañas de pantalla
    =========================================*/
    screenSizeSM = false;

    /*=========================================
      Variable global para saber cuando finaliza la carga de los datos.
    =========================================*/
    loadData = false;
  
    /*=========================================
      Paginador
    =========================================*/
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    /*=========================================
      Ordern
    =========================================*/
    @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: CategoriesService) { }

  ngOnInit(): void {
    this.getData();

    /*=========================================
    Definir el tamaño de la pantalla
    =========================================*/
    if(functions.screenSize(0, 767)){
      this.screenSizeSM = true;

    }else{

      this.screenSizeSM = false;
      this.displayedColumns.splice(2,0,'url');
      this.displayedColumns.splice(3,0,'image');

    }
  }

   /* ===========================
     Función para tomar la data de los usuarios
     =========================== */  
  getData(){
    this.loadData = true;

    this.userService.getData()
    .subscribe((resp: any)=>{
    let position = 0;
    
      this.categories =   Object.keys(resp).map(a =>({
              id: a,
              position:position+=1,
              name: resp[a].name,
              icon: resp[a].icon,
              image: resp[a].image,
              title_list: resp[a].title_list,
              url:resp[a].url,
              view: resp[a].view
      }as Icategories))

      console.log(this.categories);
     this.dataSource = new MatTableDataSource(this.categories);

     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;

     this.loadData = false;
    });
  }
  /* ===========================
     Función para aplicar filtros de búsqueda
     =========================== */  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
