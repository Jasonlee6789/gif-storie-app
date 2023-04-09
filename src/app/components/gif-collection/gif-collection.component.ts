import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { GifItem } from 'src/app/serives/interface';
import { GifStorageService } from 'src/app/store/gif-storage.service';

@Component({
  selector: 'app-gif-collection',
  templateUrl: './gif-collection.component.html',
  styleUrls: ['./gif-collection.component.scss'],
})
export class GifCollectionComponent {
  collectionItems = [];
  searchList = [];
  constructor(public store: GifStorageService) {
    store.loadGifs();
  }

  cols: number = 4;
  rowHeight: number = 100;
  trackById(index: number, item: GifItem) {
    return item.id;
  }

  onLayoutUpdated(_: any, dragSortGifs: GifItem[]) {
    this.store.gifs = dragSortGifs;
    this.store.save();
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.collectionItems,
      event.previousIndex,
      event.currentIndex
    );
  }
}
