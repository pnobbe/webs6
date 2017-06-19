import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {GamePlayHistoryComponent} from "./game.play.history.component";


describe("GamePlayHistoryComponent", () => {
  let component: GamePlayHistoryComponent;
  let fixture: ComponentFixture<GamePlayHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [GamePlayHistoryComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
