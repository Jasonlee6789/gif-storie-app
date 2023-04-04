import { Component, OnInit } from '@angular/core';
import { GifStorageService } from 'src/app/store/gif-storage.service';

@Component({
  selector: 'app-gif-collection',
  templateUrl: './gif-collection.component.html',
  styleUrls: ['./gif-collection.component.scss'],
})
export class GifCollectionComponent implements OnInit {
  gifs: { name: string; url: string }[] = [];
  filteredGifs: { name: string; url: string }[] = [];
  searchQuery = '';

  constructor(private gifStorageService: GifStorageService) {}

  ngOnInit(): void {
    this.loadGifs();
  }

  loadGifs(): void {
    this.gifs = this.gifStorageService.getStoredGifs();
    this.filteredGifs = [...this.gifs];
  }

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredGifs = this.gifs.filter((gif) =>
      gif.name.toLowerCase().includes(query)
    );
  }

  onSortChange(sortOption: string): void {
    // Implement sorting logic based on the selected sort option
  }

  downloadGif(url: string, name: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.gif`;
    link.click();
  }
}
