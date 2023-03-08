import { Injectable } from '@angular/core';
import {ApiControllers} from "../enums/api-controllers.enum";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CreatePostcardDto} from "../interfaces/create-postcard.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  controller = ApiControllers.Files;

  url = `${environment.apiUrl}/${this.controller}`

  constructor(private _httpClient: HttpClient) { }

  uploadImage(file: File): Observable<string> {
    const fileForm = new FormData()
    fileForm.append('image', file)
    return this._httpClient.post(`${this.url}/uploadimage`, fileForm, {withCredentials: true, responseType: 'text'})
  }
}
