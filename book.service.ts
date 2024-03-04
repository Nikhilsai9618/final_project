import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  apiUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(this.apiUrl);
  }

  getBookById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
