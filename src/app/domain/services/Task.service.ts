import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL_BACKEND = 'https://65eb61d643ce16418933c623.mockapi.io/api/Task';
  headers: HttpHeaders = new HttpHeaders();
  
  constructor(private http: HttpClient) 
  {
    this.headers = this.headers.set('Content-type', 'application/json');
  }


  get(){ return this.http.get<any>(this.URL_BACKEND + ``, {headers: this.headers}); }
}