import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private readonly API_KEY = '2V5uR8l9TuSWpnS2eu0nPQo7THxAcEgk';
  private readonly BASE_URL = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  searchGifs(query: string): Observable<any> {
    const url = `${this.BASE_URL}/search?api_key=${this.API_KEY}&q=${query}`;
    return this.http.get(url);
  }
}
