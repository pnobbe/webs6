import {Pipe, PipeTransform} from "@angular/core";
import {Tile} from "../../models/tile";

@Pipe({
  name: "gameTileOrderBy",
})

export class GameTileOrderBy implements PipeTransform {
  transform(array: Tile[]): Tile[] {
    array.sort((a: Tile, b: Tile) => {
      if (a.zPos < b.zPos) {
        return -1;
      } else if (a.zPos > b.zPos) {
        return 1;
      }

      if (a.xPos < b.xPos) {
        return 1;
      } else if (a.xPos > b.xPos) {
        return -1;
      }

      if (a.yPos < b.yPos) {
        return -1;
      } else if (a.yPos > b.yPos) {
        return 1;
      }
      return 0;
    });
    return array;
  }
}
