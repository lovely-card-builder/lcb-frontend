import {Component, ElementRef, ViewChild} from '@angular/core';
import {PostcardService} from "../../services/postcard.service";
import {CreatePostcardDto} from "../../interfaces/create-postcard.dto";
import {Card} from "../../libs/ui/generator-card/card.component";
import {Router} from "@angular/router";

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

  cards: Card[] = [];


  isFormInvalid = true;

  constructor(
    private _postcardService: PostcardService,
    private router: Router
  ) {
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();

    if (!this.form) {
      return;
    }
    const dto: CreatePostcardDto = {
      wishFrom: this.wishFrom,
      wishTo: this.wishTo,
      wishText: this.wishText,
      images: this.cards
    };

    this._postcardService.create(dto)
      .subscribe((newCollageId) => {
        this.router.navigate(['preview', newCollageId]).then();
      })
  }


  checkFormValidity() {
    this.isFormInvalid = !this.form.nativeElement.checkValidity();
  }

  addEmptyCard(): void {
    this.cards.push({
      id: '',
      fileName: '',
      title: ''
    });
  }

  deleteCardById(cardId: string) {
    this.cards = [...this.cards.filter(card => card.id !== cardId)];
  }
}
