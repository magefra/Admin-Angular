import { Component, OnInit } from '@angular/core';
import { Iusers } from 'src/app/interface/iusers';
import { UsersService } from 'src/app/services/users.service';

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  /* ===========================
     Variable para nombrar las columnas de nuestras tablas en material    
     =========================== */  

     displayedColumns: string[] = ['position', 
                                    'email',
                                    'actions'];


    /* displayedColumns: string[] = ['position', 
                                  'displayName',
                                  'username',
                                  'email',
                                  'picture',
                                  'method',
                                  'country',
                                  'city',
                                  'address',
                                  'phone'
                                      ]; */
   /* ===========================
     Variable global que instancie la tada que aparecerá en la tabla
     =========================== */  
    dataSource!: MatTableDataSource<Iusers>;

  /* ===========================
     Variable global de usuarios
     =========================== */  
  users: Iusers[] = [];


  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getData();
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
    });
  }
}
