import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UiVisibilityService} from "../../libs/ui/services/ui-visibility.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  isTitleMoved$ = new Observable<boolean>();
  constructor(private uiVisibilityService: UiVisibilityService, private router: Router) { }

  ngOnInit(): void {
    this.isTitleMoved$ = this.uiVisibilityService.isTitleMoved$;
  }

  moveToExamples() {
    this.router.navigate(['constructor']).then();
  }
}
