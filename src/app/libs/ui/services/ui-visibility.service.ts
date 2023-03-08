import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiVisibilityService {

  isHeaderHidden$ = new EventEmitter<boolean>();
  isFooterHidden$ = new EventEmitter<boolean>();
  private _isTitleMoved$ = new EventEmitter<boolean>();

  get isTitleMoved$(): Observable<boolean> {
    return this._isTitleMoved$;
  }
  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log(this.route.snapshot.url.join('/'))
        if (this.route.snapshot.url.join('/') === '') {
          this.isHeaderHidden$.emit(false);
          this.isFooterHidden$.emit(false);
        }
      });
  }

  moveTitle(): void {
    this._isTitleMoved$.emit(true);
  }
  returnTitle(): void {
    this._isTitleMoved$.emit(false);
  }
}
