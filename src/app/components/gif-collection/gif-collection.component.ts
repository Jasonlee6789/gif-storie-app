import { Component, OnInit } from '@angular/core';
import { GifStorageService } from 'src/app/store/gif-storage.service';

@Component({
  selector: 'app-gif-collection',
  templateUrl: './gif-collection.component.html',
  styleUrls: ['./gif-collection.component.scss'],
})
export class GifCollectionComponent implements OnInit {
  constructor(public store: GifStorageService) {}

  ngOnInit(): void {
    this.store.loadGifs();
  }
}
