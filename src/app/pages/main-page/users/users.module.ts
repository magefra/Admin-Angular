import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import {MatTableModule} from '@angular/material/table';
import { JsonToStringPipe } from 'src/app/pipes/json-to-string.pipe';

@NgModule({
  declarations: [UsersComponent,
    JsonToStringPipe],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
  ],
  exports:[
    JsonToStringPipe
  ]
})
export class UsersModule { }
