import { Injectable } from '@angular/core';
import { GifItem } from 'src/app/serives/interface';

@Injectable({
  providedIn: 'root',
})
export class GifStorageService {
  private readonly STORAGE_KEY = 'gif_storage';

  constructor() {
    this.filteredGifs = this.getStoredGifs();
  }

  getStoredGifs(): GifItem[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.filteredGifs));
  }

  storeGif(name: string, url: string): void {
    const gif = {
      name,
      url,
      added: Date.now(),
    };
    this.filteredGifs.push(gif);
    this.save();
  }

  filteredGifs: GifItem[] = [];
  searchQuery = '';

  downloadGif(url: string, name: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.gif`;
    link.click();
  }

  removeGif(url: string): void {
    this.filteredGifs = this.filteredGifs.filter((g) => g.url !== url);
    this.save();
  }

  onSortChange(sortOption: string): void {
    switch (sortOption) {
      case 'dateAsc':
        this.filteredGifs.sort((a, b) => a.added - b.added);
        break;
      case 'dateDesc':
        this.filteredGifs.sort((a, b) => b.added - a.added);
        break;
    }
    console.log('sortOption', this.filteredGifs);
  }
}
