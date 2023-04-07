import {Component} from "@angular/core";
import {KtdGridLayout, ktdTrackById} from "@katoid/angular-grid-layout";
import {GifItem} from "src/app/serives/interface";
import {GifStorageService} from "src/app/store/gif-storage.service";

@Component({
  selector: "app-gif-collection",
  templateUrl: "./gif-collection.component.html",
  styleUrls: ["./gif-collection.component.scss"],
})
export class GifCollectionComponent {


  constructor(public store: GifStorageService) {
    store.loadGifs()
  }

  cols: number = 4;
  rowHeight: number = 100;
  trackById = ktdTrackById


  onLayoutUpdated($event: KtdGridLayout, dragSortGifs: GifItem[]) {
    console.log("onLayoutUpdated", $event, dragSortGifs)
    $event.forEach((item,index) => {
      dragSortGifs[index].x = item.x
      dragSortGifs[index].y = item.y
      dragSortGifs[index].w = item.w
      dragSortGifs[index].h = item.h
      dragSortGifs[index].minW = item.minW
      dragSortGifs[index].maxW = item.maxW
      dragSortGifs[index].minH = item.minH
      dragSortGifs[index].maxH = item.maxH
      dragSortGifs[index].id = item.id
    })
    this.store.gifs = dragSortGifs;
    this.store.save();
  }
}
