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
  }

  updateStoredGifs(gifs: { name: string; url: string }[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(gifs));
  }
}
