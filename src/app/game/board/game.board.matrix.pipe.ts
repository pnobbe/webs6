import {Pipe, PipeTransform} from "@angular/core";
import {Tile} from "../../models/tile";

@Pipe({
  name: "gameTileMatrix",
})

export class GameTileMatrix implements PipeTransform {
  transform(array: Tile[]): Tile[][][] {
    const arr: Tile[][][] = [];
    for (let i = 0; i < array.length; i++) {
      const x = array[i].xPos;
      const y = array[i].yPos;
      const z = array[i].zPos;
      console.log(array[i]);
      if (!arr[z]) {
        arr.push([]);
      }
      if (!arr[z][x]) {
        arr[z].push([]);
      }
      if (!arr[z][x][y]) {
        arr[z][x].push(array[i]);
      }
    }
    console.log(arr);
    return null;
  }
}
