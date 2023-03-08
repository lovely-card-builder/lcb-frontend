import {Card} from "../libs/ui/generator-card/card.component";

export interface CreatePostcardDto {
  wishFrom: string,
  wishTo: string,
  wishText: string,
  images: Card[]
}
