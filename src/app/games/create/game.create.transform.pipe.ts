import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: "values"})
export class ValuePipe implements PipeTransform {

  transform(array: any[]): any {
    const values = [];
    for (const key in array) {
      values.push(key);
    }
    return values;
  }
}
