import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private readonly API_KEY = '<YOUR_GIPHY_API_KEY>';
  private readonly BASE_URL = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  searchGifs(query: string): Observable<any> {
    const url = `${this.BASE_URL}/search?api_key=${this.API_KEY}&q=${query}`;
    return this.http.get(url);
  }
}
