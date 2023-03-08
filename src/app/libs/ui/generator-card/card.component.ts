import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {generateRandId} from "../../utils/ts/randomizer";
import {FilesService} from "../../../services/files.service";
import {zipAll} from "rxjs";

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
  @Output() cardDeleted = new EventEmitter<string>();
  @Output() uploadStarted = new EventEmitter<void>();
  @Output() uploadEnded = new EventEmitter<void>();

  isUploading = false;

  @Input() card: Card = {
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

    if (!files.length) {
      return;
    }

    const file: File = files[0];
    this.uploadStarted.emit();
    this.isUploading = true;
    this._filesService.uploadImage(file)
      .subscribe({
          next: (fileName) => {
            this.card.fileName = fileName;
            this.uploadEnded.emit();
            this.isUploading = false;
          }, error: error => {
            console.error(error);
          }
        }
      );
  }

  eraseInput($event: MouseEvent) {
    ($event.target as HTMLInputElement).value = ''
  }

  deleteCard($event: Event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();

    this.cardDeleted.emit(this.card.id);
  }
}
