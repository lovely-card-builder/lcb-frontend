import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {PageSectionService} from "./header/services/page-section.service";
import { FooterComponent } from './footer/footer.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';

const COMPONENTS = [
  HeaderComponent
];

@NgModule({
  declarations: [
    COMPONENTS,
    FooterComponent,
    NotSupportedComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [PageSectionService],
    exports: [
        COMPONENTS,
        FooterComponent,
        NotSupportedComponent
    ]
})
export class UiModule { }
