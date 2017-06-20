import {GameCreatePage} from "./games.create.po";

describe("Game create page", () => {
  const page: GameCreatePage = new GameCreatePage();

  beforeAll(() => {
    page.navigateTo();
  });

  it("should display page title", () => {
    expect(page.getTitleText()).toEqual("New game");
  });

  it("should have a disabled submit button", () => {
    expect(page.getSubmitButton().isEnabled()).toBe(false);
  });

  it("should have a minimum players selector", () => {
    expect(page.getMinPlayersSelector()).toBeTruthy();
  });

  it("should have a maximum players selector", () => {
    expect(page.getMaxPlayersSelector()).toBeTruthy();
  });

  it("should have a template selector", () => {
    expect(page.getTemplateSelector()).toBeTruthy();
  });

  it("should not have a template selected", () => {
    expect(page.getNoBoardSelected()).toBeTruthy();
  });

  it("should select the first template", () => {
    expect(page.selectShanghaiTemplate()).toBe("Shanghai");
  });

  it("should set input values to 2", () => {
    expect(page.setInputValues()).toBeTruthy();
  });

  it("should have a board selected", () => {
    expect(page.getBoard()).toBeTruthy();
  });

  it("should have an enabled submit button", () => {
    expect(page.getSubmitButton().isEnabled()).toBe(true);
  });

});
