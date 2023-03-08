import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiControllers} from "../enums/api-controllers.enum";
import {environment} from "../../environments/environment";
import {LoginDto} from "../interfaces/login.dto";
import {map, Observable} from "rxjs";
import {CreatePostcardDto} from "../interfaces/create-postcard.dto";
import {Postcard} from "../interfaces/postcard";

@Injectable({
  providedIn: 'root'
})
export class PostcardService {

  controller = ApiControllers.Postcard;

  url = `${environment.apiUrl}/${this.controller}`

  constructor(private _httpClient: HttpClient) { }

  create(request: CreatePostcardDto): Observable<string> {
    return this._httpClient.post<string>(`${this.url}/create`, request, {withCredentials: true})
  }
  getmy(): Observable<Postcard[]> {
    return this._httpClient.post<Postcard[]>(`${this.url}/getmy`, {}, {withCredentials: true})
  }
  get(id: string): Observable<Postcard> {
    return this._httpClient.get<Postcard>(`${this.url}/${id}`, {withCredentials: true})
  }
}
