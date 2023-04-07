import {CdkDragDrop, CdkDragMove, moveItemInArray} from "@angular/cdk/drag-drop";
import {Injectable} from "@angular/core";
import {GifItem} from "src/app/serives/interface";

@Injectable({
  providedIn: "root",
})
export class GifStorageService {
  private readonly STORAGE_KEY = "gif_storage";

  constructor() {
  }

  getStoredGifs(): GifItem[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.gifs));
  }

  storeGif(name: string, url: string): void {
    const gif = {
      id: this.gifs.length + "",
      name,
      url,
      added: Date.now(),
      x: this.gifs.length % 4,
      y: Math.floor(this.gifs.length / 4),
      w: 1,
      h: 3,
      minW: 3, maxW: 6, minH: 3, maxH: 10
    }
    this.gifs.push(gif);
    this.save();
    this.loadGifs();
  }

  gifs: GifItem[] = [];
  filteredGifs: GifItem[] = [];
  searchQuery = "";

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredGifs = this.gifs.filter((gif) =>
      gif.name.toLowerCase().includes(query)
    );
    this.retsetIds(this.getIds())
  }

  loadGifs(): void {
    this.gifs = this.getStoredGifs();
    this.filteredGifs = [...this.gifs];
  }

  downloadGif(url: string, name: string): void {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.gif`;
    link.click();
  }

  removeGif(url: string): void {
    this.gifs = this.gifs.filter(g => g.url !== url);
    this.filteredGifs = this.filteredGifs.filter(g => g.url !== url);
    this.retsetIds(this.getIds())
    this.save()
  }

  onSortChange(sortOption: string): void {
    let ids = this.getIds();
    switch (sortOption) {
      case "dateAsc":
        this.filteredGifs.sort((a, b) => a.added - b.added);
        break;
      case "dateDesc":
        this.filteredGifs.sort((a, b) => b.added - a.added);
        break;
      case "nameAsc":
        this.filteredGifs.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        this.filteredGifs = this.gifs.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    this.retsetIds(ids);
    console.log("sortOption", this.filteredGifs)
  }

  private retsetIds(ids: number[]) {
    this.filteredGifs.forEach((gif, index) => {
      gif["id"] = ids[index] + ""
    });
  }

  private getIds() {
    return this.filteredGifs.map((gif, index) => +gif.id).sort();
  }

  private copy<T>(gif: T): T {
    return JSON.parse(JSON.stringify(gif))
  }
}
