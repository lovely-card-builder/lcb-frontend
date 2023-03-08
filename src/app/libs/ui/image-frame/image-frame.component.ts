import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'lcb-image-frame',
  templateUrl: './image-frame.component.html',
  styleUrls: ['./image-frame.component.scss']
})
export class ImageFrameComponent implements OnInit {

  @Input() fileUrl = '';

  absoluteFilePath = '';

  frameUrl = '';
  constructor() { }

  ngOnInit(): void {
    const randIdx = Math.floor(Math.random() * 4) + 1;
    this.frameUrl = 'white-frame-' + randIdx.toString() + '.png';
    this.absoluteFilePath = this.getPathForImage(this.fileUrl);
  }

  getPathForImage(imageName: string) {
    return `${environment.apiUrl}/files/get/${imageName}`;
  }

}
