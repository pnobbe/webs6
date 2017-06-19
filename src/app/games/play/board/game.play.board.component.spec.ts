import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {GamePlayBoardComponent} from "./game.play.board.component";


describe("GamePlayComponent", () => {
  let component: GamePlayBoardComponent;
  let fixture: ComponentFixture<GamePlayBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [GamePlayBoardComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
