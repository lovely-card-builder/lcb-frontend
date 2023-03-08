import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    PreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: PreviewComponent
      }
    ])
  ]
})
export class PreviewModule { }
