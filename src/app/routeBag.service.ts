import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

// Singleton service that contains data that needs to be saved while being able to navigate

@Injectable()
export class RouteBag {

  private table = {};

  getData(key:string):any {

    return this.table[key];
  }

  setData(key:string, obj:any) {
    this.table[key] = obj;
  }


}
