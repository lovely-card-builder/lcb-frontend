import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorComponent } from './constructor.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ConstructorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConstructorComponent
      }
    ]),
  ]
})
export class ConstructorModule { }
