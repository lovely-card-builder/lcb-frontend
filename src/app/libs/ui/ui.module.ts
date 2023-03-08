import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {PageSectionService} from "./header/services/page-section.service";
import { FooterComponent } from './footer/footer.component';
import { NotSupportedComponent } from './not-supported/not-supported.component';
import {RouterLinkWithHref} from "@angular/router";
import { CardComponent } from './generator-card/card.component';
import {FormsModule} from "@angular/forms";
import { LoaderHeartComponent } from './loader-heart/loader-heart.component';

const COMPONENTS = [
  HeaderComponent
];

@NgModule({
  declarations: [
    COMPONENTS,
    FooterComponent,
    NotSupportedComponent,
    CardComponent,
    LoaderHeartComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    FormsModule
  ],
  providers: [PageSectionService],
  exports: [
    COMPONENTS,
    FooterComponent,
    NotSupportedComponent,
    CardComponent
  ]
})
export class UiModule { }
