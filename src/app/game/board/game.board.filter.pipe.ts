import {Pipe, PipeTransform} from "@angular/core";
import {Tile} from "../../models/tile";

@Pipe({
  name: "filterHidden",
  pure: false
})

export class FilterHiddenTilePipe implements PipeTransform {
  transform(array: Array<Tile>, args: string): Array<Tile> {
    return array.filter(c => {
      return c.hidden === false;
    });
  }
}
