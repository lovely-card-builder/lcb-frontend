import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {PageSectionService} from "./header/services/page-section.service";
import { FooterComponent } from './footer/footer.component';

const COMPONENTS = [
  HeaderComponent
];

@NgModule({
  declarations: [
    COMPONENTS,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [PageSectionService],
  exports: [
    COMPONENTS,
    FooterComponent
  ]
})
export class UiModule { }
