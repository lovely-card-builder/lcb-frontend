import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {PostcardService} from "../../services/postcard.service";
import {ActivatedRoute} from "@angular/router";
import {Postcard} from "../../interfaces/postcard";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {
  @ViewChildren('image') imagesOnPage!: QueryList<HTMLImageElement>;

  postcard: Postcard = {
    wishFrom: '',
    wishTo: '',
    wishText: '',
    images: []
  };

  private loadedImageCount = 0;
  areImagesLoaded = false;

  constructor(
    private _postcardService: PostcardService,
    private _route: ActivatedRoute,
  ) {
  }

  imageLoaded(): void {
    this.loadedImageCount++;
    console.log(this.loadedImageCount)

    this.areImagesLoaded = this.loadedImageCount === this.imagesOnPage.length;
  }

  ngOnInit(): void {
    this._route.params.subscribe(x => {
      let id = x['id']
      this._postcardService.get(id).subscribe({
        next: (c) => {
          this.postcard = {...c}
        }
      });
    });
  }

  ngAfterViewInit() {
    this.imagesOnPage.changes.subscribe(value => {
      if (value.length > 0) {
        this.initLoader();
      }
    })
  }

  getPathForImage(imageName: string) {
    return `${environment.apiUrl}/files/get/${imageName}`;
  }

  private initLoader() {
    this.imagesOnPage.toArray().forEach(image => {
      image = (image as any as ElementRef<HTMLImageElement>).nativeElement;
      if (image.complete) {
        this.imageLoaded();
      } else {
        image.addEventListener('load', this.imageLoaded.bind(this));
      }
    });
  }
}
