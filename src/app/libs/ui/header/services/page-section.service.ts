import { Injectable } from '@angular/core';

export type SectionsIds = { [key: string]: string; }

@Injectable({
  providedIn: 'root'
})
export class PageSectionService {
  sectionsIds: SectionsIds = {
    home: 'home',
    examples: 'examples',
    create: 'create'
  }
}
