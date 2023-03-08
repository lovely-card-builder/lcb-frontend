import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PreviewComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: PreviewComponent
            }
        ]),
        FormsModule
    ]
})
export class PreviewModule { }
