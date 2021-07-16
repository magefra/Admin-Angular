import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisputesRoutingModule } from './disputes-routing.module';
import { DisputesComponent } from './disputes.component';


@NgModule({
  declarations: [DisputesComponent],
  imports: [
    CommonModule,
    DisputesRoutingModule
  ]
})
export class DisputesModule { }
