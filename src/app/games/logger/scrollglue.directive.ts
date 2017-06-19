import {Directive, ElementRef, Input, AfterContentInit, OnDestroy} from "@angular/core";


@Directive({
  selector: "[appScrollGlue]",
})
export class ScrollGlue implements AfterContentInit, OnDestroy {
  public el: any;
  public isLocked = false;
  private _observer: any;
  private _oldScrollHeight = 0;

  constructor(private _el: ElementRef) {
    this.el = _el.nativeElement;
  }


  ngAfterContentInit() {
    this.el.scrollTop = this.el.scrollHeight;

    // create an observer instance
    this._observer = new MutationObserver((mutations) => {
      if (!this.isLocked) {
        this._oldScrollHeight = this.el.scrollHeight;
        this.el.scrollTop = this.el.scrollHeight;
      }
    });

    // configuration of the observer:
    const config = {childList: true, subtree: true};
    const target = this.el;

    // pass in the target node, as well as the observer options
    this._observer.observe(target, config);
  }

  ngOnDestroy() {
    this._observer.disconnect();
  }
}
