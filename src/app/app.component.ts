import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { GiphyService } from 'src/app/serives/giphy.service';
import { GifItem } from 'src/app/serives/interface';
import { GifStorageService } from 'src/app/store/gif-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchQuery = '';
  searchResults: { name: string; url: string }[] = [];
  private debounceSearchChangeTimeout: number | undefined;

  constructor(
    public giphyService: GiphyService,
    public store: GifStorageService
  ) {}

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
    const storedGifs = this.store.getStoredGifs();
    return storedGifs.some(
      (storedGif) => storedGif.url === gif.images.fixed_width.url
    );
  }

  addGifToCollection(gif: { name: string; url: string }): void {
    // transfer gif form search results to collection
    this.searchResults = this.searchResults.filter((result) => result !== gif);
    this.store.storeGif(gif.name, gif.url);
  }

  drop(event: CdkDragDrop<any>) {
    let searchList = event.previousContainer;
    searchList.data[event.previousIndex].added = searchList.data[
      event.currentIndex
    ].added = Date.now();

    if (searchList === event.container) {
      // resorting in the same list
      console.log('move');
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('transfer');
      // dropping in a different list
      transferArrayItem(
        searchList.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.store.save();
    console.log('sortOption', this.store.filteredGifs);
  }

  showFilter(gif: GifItem): boolean {
    return gif.name.includes(this.store.searchQuery.trim());
  }
}
