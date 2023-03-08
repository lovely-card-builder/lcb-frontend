import { Injectable } from '@angular/core';
import {LocalStorageEnum} from "../enums/local-storage.enum";
import {LoginDto} from "../interfaces/login.dto";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {ApiControllers} from "../enums/api-controllers.enum";
import {environment} from "../../environments/environment";
import {RegisterDto} from "../interfaces/register.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  controller = ApiControllers.Account;

  url = `${environment.apiUrl}/${this.controller}`

  constructor(private _httpClient: HttpClient) { }

  private _token = '';

  get token(): string {
    if (!this._token) {
      this._token = localStorage.getItem(LocalStorageEnum.Token) || ''
    }
    return this._token
  }

  set token(token: string) {
    this._token = token
    localStorage.setItem(LocalStorageEnum.Token, this._token)
  }

  public killAuthorization(): void {
    this.token = ''
    localStorage.removeItem(LocalStorageEnum.Token)
  }

  isLoggedIn(): boolean {
    return !!this.token
  }

  login(request: LoginDto): Observable<void> {
    return this._httpClient.post<string>(`${this.url}/login`, request, {withCredentials: true})
      .pipe(
        map((response: string) => {
          this.token = response
        })
      )
  }

  register(request: RegisterDto): Observable<void> {
    return this._httpClient.post<string>(`${this.url}/register`, request, {withCredentials: true})
      .pipe(
        map((response: string) => {
          this.token = response
        })
      )
  }
}
