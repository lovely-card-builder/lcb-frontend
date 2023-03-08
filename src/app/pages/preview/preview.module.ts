import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UiModule} from "../../libs/ui/ui.module";



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
        ]),
        FormsModule,
        UiModule
    ]
})
export class PreviewModule { }
