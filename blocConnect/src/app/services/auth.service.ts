import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(data: any) {
    return this.httpClient.post('http://localhost:4200/login', data);
  }
}