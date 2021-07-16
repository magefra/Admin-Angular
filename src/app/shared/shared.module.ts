import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// rutas
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    SidebarComponent
  ]
  
})
export class SharedModule { }
