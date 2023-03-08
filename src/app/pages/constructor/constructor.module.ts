import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorComponent } from './constructor.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



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
    FormsModule,
  ]
})
export class ConstructorModule { }
