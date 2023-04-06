import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifStorageService {
  private readonly STORAGE_KEY = 'gif_storage';

  constructor() {}

  getStoredGifs(): { name: string; url: string }[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  storeGif(name: string, url: string): void {
    const storedGifs = this.getStoredGifs();
    storedGifs.push({ name, url });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storedGifs));
    this.loadGifs();
  }

  updateStoredGifs(gifs: { name: string; url: string }[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(gifs));
    this.loadGifs();
  }

  gifs: { name: string; url: string }[] = [];
  filteredGifs: { name: string; url: string }[] = [];
  searchQuery = '';
  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredGifs = this.gifs.filter((gif) =>
      gif.name.toLowerCase().includes(query)
    );
  }
  loadGifs(): void {
    this.gifs = this.getStoredGifs();
    this.filteredGifs = [...this.gifs];
  }
  downloadGif(url: string, name: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.gif`;
    link.click();
  }
  onSortChange(sortOption: string): void {
    // Implement sorting logic based on the selected sort option
  }

}
