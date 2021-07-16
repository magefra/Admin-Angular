import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriesRoutingModule } from './subcategories-routing.module';
import { SubcategoriesComponent } from './subcategories.component';


@NgModule({
  declarations: [SubcategoriesComponent],
  imports: [
    CommonModule,
    SubcategoriesRoutingModule
  ]
})
export class SubcategoriesModule { }
