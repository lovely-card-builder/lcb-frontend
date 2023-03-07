import { Component } from '@angular/core';
import {PageSectionService} from "./services/page-section.service";

@Component({
  selector: 'lcb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  constructor(public pageSectionService: PageSectionService) { }
}
