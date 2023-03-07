import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructorComponent } from './constructor.component';
import {RouterModule} from "@angular/router";
import {ThreeLeavesModule} from "../../libs/threejs/three-leaves/three-leaves.module";



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
    ThreeLeavesModule
  ]
})
export class ConstructorModule { }
