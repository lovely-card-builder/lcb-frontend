import { Component, OnInit } from '@angular/core';
import {UiVisibilityService} from "../services/ui-visibility.service";
import {Observable} from "rxjs";

@Component({
  selector: 'lcb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isFooterHidden$ = new Observable<boolean>();
  constructor(private uiVisibilityService: UiVisibilityService) { }

  ngOnInit(): void {
    this.isFooterHidden$ = this.uiVisibilityService.isFooterHidden$;
  }

}
