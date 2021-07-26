import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iusers } from 'src/app/interface/iusers';
import { UsersService } from 'src/app/services/users.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { functions } from '../../helpers/functions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class UsersComponent implements OnInit {

 /* ===========================
     Variable global que captura la ruta de los archivos de imagen
     =========================== */  
     path: string = environment.urlFiles;

     
  /* ===========================
     Variable para nombrar las columnas de nuestras tablas en material    
     =========================== */  

     displayedColumns: string[] = ['position', 
                                    'email',
                                    'actions'];


   /* ===========================
     Variable global que instancie la tada que aparecerá en la tabla
     =========================== */  
    dataSource!: MatTableDataSource<Iusers>;

    /* ===========================
      Variable global de usuarios
      =========================== */  
    users: Iusers[] = [];


    /* ===========================
      Variable global que informa a la vista cuando hay una expansión de la tabla.
      =========================== */  
    expandedElement!: Iusers | null;

    /*=========================================
      Variable global para definir tamañas de pantalla
    =========================================*/
    screenSizeSM = false;
  
    /*=========================================
      Paginador
    =========================================*/
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    /*=========================================
      Ordern
    =========================================*/
    @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getData();

    /*=========================================
    Definir el tamaño de la pantalla
    =========================================*/
    if(functions.screenSize(0, 767)){
      this.screenSizeSM = true;

    }else{

      this.screenSizeSM = false;
      this.displayedColumns.splice(1,0,'displayName');
      this.displayedColumns.splice(2,0,'username');

    }
  }

   /* ===========================
     Función para tomar la data de los usuarios
     =========================== */  
  getData(){
    this.userService.getData()
    .subscribe((resp: any)=>{
    let position = 1;
    
      this.users =   Object.keys(resp).map(a =>({
              id: a,
              position:position+1,
              address: resp[a].address,
              city: resp[a].city,
              country: resp[a].country,
              country_code: resp[a].country_code,
              displayName:resp[a].displayName,
              email: resp[a].email,
              idToken : resp[a].idToken,
              method:resp[a].method,
              phone: resp[a].phone,
              picture:resp[a].picture,
              username: resp[a].username,
              wishlist:resp[a].wishlist
      }as Iusers))

     this.dataSource = new MatTableDataSource(this.users);

     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
    });
  }
  /* ===========================
     Función para aplicar filtros de búsqueda
     =========================== */  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
