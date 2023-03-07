import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeLeavesComponent } from './three-leaves.component';



@NgModule({
  declarations: [
    ThreeLeavesComponent
  ],
  exports: [
    ThreeLeavesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ThreeLeavesModule { }
