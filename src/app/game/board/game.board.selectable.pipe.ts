import {Pipe, PipeTransform} from "@angular/core";
import {Tile} from "../../models/tile";

@Pipe({
  name: "filterSelectable",
  pure: false
})

export class FilterSelectablePipe implements PipeTransform {
  transform(array: Array<Tile>, selectable: boolean): Array<Tile> {

    const arr: Array<Tile> = [];
    for (let i = 0; i < array.length; i++) {
      const x = array[i].xPos;
      const y = array[i].yPos;
      const z = array[i].zPos;
      const id = "x" + x + "y" + y + "z" + z;
      arr[id] = array[i];
    }

    for (let i = 0; i < array.length; i++) {
      let valid = selectable;

      if (valid) {
        if (array[i].historyTile) {
          valid = false;
        }

        const x = array[i].xPos;
        const y = array[i].yPos;
        const z = array[i].zPos;
        if (valid) {
          // Check if tile is surrounded
          const l = arr[this.getId(x - 2, y, z)];
          const tl = arr[this.getId(x - 2, y + 1, z)];
          const bl = arr[this.getId(x - 2, y - 1, z)];
          const r = arr[this.getId(x + 2, y, z)];
          const tr = arr[this.getId(x + 2, y + 1, z)];
          const br = arr[this.getId(x + 2, y - 1, z)];

          if ((l || tl || bl) && (r || tr || br)) {
            valid = false;
          }
        }
        if (valid) {
          // Check if tile is on top
          const n = arr[this.getId(x, y + 1, z + 1)];
          const ne = arr[this.getId(x + 1, y + 1, z + 1)];
          const e = arr[this.getId(x + 1, y, z + 1)];
          const se = arr[this.getId(x + 1, y - 1, z + 1)];
          const s = arr[this.getId(x, y - 1, z + 1)];
          const sw = arr[this.getId(x - 1, y - 1, z + 1)];
          const w = arr[this.getId(x - 1, y, z + 1)];
          const nw = arr[this.getId(x - 1, y + 1, z + 1)];
          const d = arr[this.getId(x, y, z + 1)];

          if (n || ne || e || se || s || sw || w || nw || d) {
            valid = false;
          }
        }
      }

      array[i].selectable = valid;

    }
    return array;
  }

  private getId(x: number, y: number, z: number): string {
    return "x" + x + "y" + y + "z" + z;
  }

}
