import {Component, OnInit} from '@angular/core';
import {UiVisibilityService} from "../services/ui-visibility.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'lcb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHeaderHidden$ = new Observable<boolean>();

  constructor(
    private uiVisibilityService: UiVisibilityService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isHeaderHidden$ = this.uiVisibilityService.isHeaderHidden$;
  }

  moveToHome(): void {
    this.returnTitle();
  }

  moveToExamples(): void {
    this.uiVisibilityService.moveTitle();
  }

  navigateToConstructor(): void {
    this.router.navigate(['constructor']).then();
  }

  private returnTitle() {
    this.uiVisibilityService.returnTitle();
  }

}
