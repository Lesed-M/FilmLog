import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  '#IMDB_ID': string;
  '#TITLE': string;
  '#YEAR': number;
  '#ACTORS': string;
  '#IMG_POSTER': string;
  '#AKA': string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = 'https://imdb.iamidiotareyoutoo.com';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get(`${this.baseUrl}/search`, { params });
  }
}