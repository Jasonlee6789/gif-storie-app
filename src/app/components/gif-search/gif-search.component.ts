import { Component, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/serives/giphy.service';
import { GifStorageService } from 'src/app/store/gif-storage.service';

@Component({
  selector: 'app-gif-search',
  templateUrl: './gif-search.component.html',
  styleUrls: ['./gif-search.component.scss'],
})
export class GifSearchComponent implements OnInit {
  searchQuery = '';
  searchResults: { name: string; url: string }[] = [];
  private debounceSearchChangeTimeout: number | undefined;

  constructor(
    private giphyService: GiphyService,
    private gifStorageService: GifStorageService
  ) {}

  ngOnInit(): void {}

  /**
   * implement search debounce
   */
  debounceSearchChange(): void {
    clearTimeout(this.debounceSearchChangeTimeout);
    this.debounceSearchChangeTimeout = setTimeout(() => {
      this.onSearchChange();
    }, 800);
  }
  onSearchChange(): void {
    if (this.searchQuery.trim()) {
      this.giphyService.searchGifs(this.searchQuery).subscribe((response) => {
        this.searchResults = response.data
          .filter((gif: any) => !this.isGifInCollection(gif))
          .map(
            (gif: { title: any; images: { fixed_width: { url: any } } }) => ({
              name: gif.title,
              url: gif.images.fixed_width.url,
            })
          );
      });
    } else {
      this.searchResults = [];
    }
  }

  isGifInCollection(gif: {
    images: { fixed_width: { url: string } };
  }): boolean {
    const storedGifs = this.gifStorageService.getStoredGifs();
    return storedGifs.some(
      (storedGif) => storedGif.url === gif.images.fixed_width.url
    );
  }

  addGifToCollection(gif: { name: string; url: string }): void {
    // transfer gif form search results to collection
    this.searchResults = this.searchResults.filter((result) => result !== gif);
    this.gifStorageService.storeGif(gif.name, gif.url);
  }
}
