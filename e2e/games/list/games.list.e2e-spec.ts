import {GamesPage} from "./games.list.po";

describe("Game list page", () => {
  const page: GamesPage = new GamesPage();
  let gameId: string;

  beforeAll(() => {
    page.navigateTo();
  });

  it("should display page title", () => {
    expect(page.getTitleText()).toEqual("Games list");
  });

  it("should navigate to started games", () => {
    expect(page.navigateToStartedGames()).toBeTruthy();
  });

  it("should have more than 0 games listed", () => {
    expect(page.getGamesList()).toBeTruthy();
    expect(page.getGamesListSize()).toBeGreaterThan(0);
  });

  it("should favorite the first available game", () => {
     page.favoriteGame().then(s => {
       expect(s).not.toBeNull();
       gameId = s;
     });
  });

  it("should navigate to favorited games", () => {
    expect(page.navigateToFavoritedGames()).toBeTruthy();
  });

  it("should contain the favorited game as the first item", () => {
    expect(page.getGamesList().first().getAttribute("id")).toBe(gameId);
  });

  it("should have a game with spectate button", () => {
    expect(page.gameHasSpectateButton(gameId)).toBeTruthy();
  });

  it("should spectate the favorited game", () => {
    expect(page.spectateGame()).toBeTruthy();
  });;
});
