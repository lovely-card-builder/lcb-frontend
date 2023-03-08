import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {generateRandId} from "../../utils/ts/randomizer";
import {FilesService} from "../../../services/files.service";

export interface Card {
  id: string;
  fileName: string;
  title: string;
}

@Component({
  selector: 'lcb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() cardUpdated = new EventEmitter<Card>();

  card: Card = {
    id: '',
    fileName: '',
    title: ''
  };

  constructor(private _filesService: FilesService) {
  }

  ngOnInit(): void {
    this.card.id = generateRandId();
  }


  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = (fileInput.files as FileList);
    for (let i = 0; i < files.length; i++) {
      const file: File = files[0];
      this._filesService.uploadImage(file)
        .subscribe({
            next: (fileName) => {
              this.card.fileName = fileName;
            }, error: error => {
              console.error(error);
            }
          }
        );
    }
  }

  eraseInput($event: MouseEvent) {
    ($event.target as HTMLInputElement).value = ''
  }

}
