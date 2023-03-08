import {Component, OnInit} from '@angular/core';
import {PostcardService} from "../../services/postcard.service";
import {FilesService} from "../../services/files.service";
import {CreatePostcardDto} from "../../interfaces/create-postcard.dto";
import {tap} from "rxjs";

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {
  wishFrom: string = '';
  wishTo: string = '';
  wishText: string = '';

  images: string[] = [];

  constructor(
    private _postcardService: PostcardService,
    private _filesService: FilesService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let dto: CreatePostcardDto = {
      wishFrom: this.wishFrom,
      wishTo: this.wishTo,
      wishText: this.wishText,
      images: this.images
    };
    this._postcardService.create(dto)
      .subscribe((r) => alert('Created: ' + r))
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = (fileInput.files as FileList);
    for (let i = 0; i < files.length; i++) {
      const file: File = files[0];
      this._filesService.uploadImage(file)
        .subscribe({
            next: (x) => {
              console.log(x);
              this.images.push(x)
            }, error: error => {
              console.error(error);
            }, complete: () => {
            }
          }
        );
    }
  }

  eraseInput($event: MouseEvent) {
    ($event.target as HTMLInputElement).value = ''
  }
}
