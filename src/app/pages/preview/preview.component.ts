import {Component, OnInit} from '@angular/core';
import {PostcardService} from "../../services/postcard.service";
import {ActivatedRoute} from "@angular/router";
import {Postcard} from "../../interfaces/postcard";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  public postcard: Postcard = {
    wishFrom: '',
    wishTo: '',
    wishText: '',
    images: []
  };

  constructor(
    private _postcardService: PostcardService,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._route.params.subscribe(x => {
      let id = x['id']
      this._postcardService.get(id).subscribe({ next: (c) => this.postcard = c})
    })
  }

  getPathForImage(imageName: string) {
    return `${environment.apiUrl}/files/get/${imageName}`;
  }
}
