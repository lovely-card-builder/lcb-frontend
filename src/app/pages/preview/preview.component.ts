import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {PostcardService} from "../../services/postcard.service";
import {ActivatedRoute} from "@angular/router";
import {Postcard, PostcardImage} from "../../interfaces/postcard";
import {environment} from "../../../environments/environment";
import {gsap} from "gsap";
import {TextPlugin} from "gsap/TextPlugin"
import {Card} from "../../libs/ui/generator-card/card.component";
import {generateRandId} from "../../libs/utils/ts/randomizer";
import {bool} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";


@Component({
  selector: 'lcb-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {
  @ViewChildren('img') imagesOnPage!: QueryList<HTMLImageElement>;

  postcard: Postcard = {
    wishFrom: '',
    wishTo: '',
    wishText: '',
    images: []
  };

  cards: Card[] = [];

  postcardId: string = '';
  areImagesLoaded = false;

  private isViewInited = false;
  private isViewPrepared$ = new EventEmitter<boolean>();

  private loadedImageCount = 0;
  private tl = gsap.timeline({delay: 3});

  constructor(
    private _postcardService: PostcardService,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.parseRouteParams();

    window.onload = () => {
      this.areImagesLoaded = true;
      console.log('here1')
      this.isViewPrepared$.emit(true);
    }

    this.isViewPrepared$.subscribe((value) => {
      if (value && this.areImagesLoaded && this.isViewInited) {
        console.log('here')
        this.setupGSAP();
      }
    })
  }

  ngAfterViewInit() {
    this.isViewInited = true;

    console.log('here2')
    this.isViewPrepared$.emit(true);
  }

  private parseRouteParams() {
    this._route.params.subscribe(params => {
      this.postcardId = params['id']
      this._postcardService.get(this.postcardId).subscribe({
        next: (c) => {
          this.postcard = {...c}
          this.mapPostacrdImages(this.postcard.images);
        }
      });
    });
  }

  private setupGSAP() {
    gsap.registerPlugin(TextPlugin)

    this.tl.from('#foreword', {
      opacity: 0,
      y: -100,
      duration: 1.7
    });

    this.tl.from('#preview-cards-container', {
      opacity: 0,
      duration: 1,
    });
  }

  private mapPostacrdImages(images: PostcardImage[]) {
    this.cards = images.map<Card>(image => {
      return {
        id: generateRandId(),
        title: image.title,
        fileName: image.fileName,
      }
    });
  }
}
