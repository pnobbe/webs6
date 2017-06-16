import {Pipe, PipeTransform} from "@angular/core";
import {Tile} from "../../models/tile";

@Pipe({
  name: "gameTileOrderBy",
})

export class GameTileOrderBy implements PipeTransform {
  transform(array: Array<Tile>, args: string): Array<Tile> {
    array.sort((a: Tile, b: Tile) => {
      if (a.zPos < b.zPos) {
        return -1;
      } else if (a.zPos > b.zPos) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(array);
    return array;
  }
}
