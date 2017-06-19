import {Pipe, PipeTransform} from "@angular/core";
import {Tile} from "../../models/tile";

@Pipe({
  name: "filterHidden",
  pure: false
})

export class FilterHiddenTilePipe implements PipeTransform {
  transform(array: Array<Tile>, args: string): Array<Tile> {
    return array.filter(c => {
      if (c.hidden === false && c.match !== null) {
        console.log("AAA");
      }
      if (c.hidden === true && c.match === null) {
        console.log("AAA");
      }
      return c.hidden === false;
    });
  }
}
