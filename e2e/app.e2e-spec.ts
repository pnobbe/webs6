import { SpaceMayhemPage } from "./app.po";

describe("space-mayhem App", () => {
  let page: SpaceMayhemPage;

  beforeEach(() => {
    page = new SpaceMayhemPage();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});
