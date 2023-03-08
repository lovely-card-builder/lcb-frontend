import {Component, ElementRef, ViewChild} from '@angular/core';
import {PostcardService} from "../../services/postcard.service";
import {CreatePostcardDto} from "../../interfaces/create-postcard.dto";
import {Card} from "../../libs/ui/generator-card/card.component";

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent {
  @ViewChild('constructorForm') form!: ElementRef<HTMLFormElement>;

  wishFrom: string = '';
  wishTo: string = '';
  wishText: string = '';

  images: string[] = [];
  cards: Card[] = [];


  isFormInvalid = true;

  constructor(
    private _postcardService: PostcardService
  ) {
  }

  onSubmit() {
    console.log(this.form.nativeElement.checkValidity())

    if (!this.form) {
      return;
    }

    // TODO: Remove before prod deploy.
    return;

    const dto: CreatePostcardDto = {
      wishFrom: this.wishFrom,
      wishTo: this.wishTo,
      wishText: this.wishText,
      images: this.images
    };
    this._postcardService.create(dto)
      .subscribe((r) => alert('Created: ' + r))
  }


  checkFormValidity() {
    this.isFormInvalid = !this.form.nativeElement.checkValidity();
  }

  updateCards(card: Card) {
    const cardToUpdateIdx = this.cards.findIndex((value) => value.id = card.id);
    this.cards[cardToUpdateIdx] = {...card};
  }

  addEmptyCard(): void {
    this.cards.push({
      id: '',
      fileName: '',
      title: ''
    });
  }
}
